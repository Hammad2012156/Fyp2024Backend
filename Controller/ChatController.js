const db = require("../config/Connection");
const Trackerror = require("../Middleware/TrackError");
const HandlerCallBack = require("../Utils/HandlerCallBack");
const { Op, literal } = require("sequelize");
const { getPagination, getPagingData1 } = require("../Utils/Pagination");
const { generateFileName } = require("../Utils/FileNameGeneration");
const { GroupMedia, PeerMedia } = require("../Utils/Path");
const { uploadFile } = require("../Utils/s3");
const io = require("../Utils/socket");
exports.UserPeerToPeerChatListing = Trackerror(async (req, res, next) => {
  // const data = await db.MessagingModel.findAll({
  //   where: {
  //     [Op.or]: [
  //       {
  //         SenderId: req.user.Employee,
  //       },
  //       // {
  //       //   ReceiverId: req.user.Employee,
  //       // },
  //     ],
  //   },
  //   attributes: ["_id", "ReceiverId"],
  //   group: [["ReceiverId"]],
  //   include: [
  //     {
  //       model: db.EmployeeModel,
  //       as: "ReceiverIdData",
  //     },
  //   ],
  // });
  const data = await db.EmployeeModel.findAll({
    where: {
      [Op.and]: [
        {
          [Op.not]: { _id: req.user.Employee }
        },
        {
          Ceo: req.user.Ceo
        }
      ]
    },
    attributes: [
      "_id",
      "Name",
      "Email",
      [
        literal(
          `(select createdAt from MessagingModel where ReceiverId in (EmployeeModel._id,"${req.user.Employee}") Or SenderId in (EmployeeModel._id,"${req.user.Employee}") order by createdAt desc  limit 1 )`
        ),
        "LastMessageSentTime"
      ]
    ],
    include: [
      {
        model: db.DesignationModel,
        as: "DesignationData",
        attributes: ["_id", "Name"]
      }
      //   {
      //     model: db.MessagingModel,
      //     as: "SenderIdData",
      //     limit: 1,
      //   },
      //   {
      //     model: db.MessagingModel,
      //     as: "ReceiverIdData",
      //     limit: 1,
      //   },
    ]
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.UserPeerChat = Trackerror(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new HandlerCallBack("Kindly Provide id for search", 404));
  }
  const data = await db.MessagingModel.findAll({
    where: {
      [Op.or]: [
        {
          ConversationId: `${id}/${req.user.Employee}`
        },
        {
          ConversationId: `${req.user.Employee}/${id}`
        }
      ]
    },
    attributes: ["_id", "Body", "SenderId", "ReceiverId", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.MessageMediaModel,
        as: "EmployeeMessageMedia"
      }
    ]
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.UserGroupChatListing = Trackerror(async (req, res, next) => {
  const MessagesGroupOfParticipant =
    await db.GroupMessageParticipantModel.findAll({
      where: {
        [Op.and]: [
          {
            ParticipantId: req.user.Employee
          },
          {
            Ceo: req.user.Ceo
          }
        ]
      },
      attributes: ["_id", "MessagingGroupId"],
      raw: true
    });
  let ParticipantGroups = ["123"];
  for (let i = 0; i < MessagesGroupOfParticipant.length; i++) {
    ParticipantGroups.push(MessagesGroupOfParticipant[i].MessagingGroupId);
  }
  const data = await db.MessagingGroupModel.findAll({
    where: {
      [Op.and]: [
        {
          _id: ParticipantGroups
        },
        {
          Ceo: req.user.Ceo
        }
      ]
    },
    attributes: ["_id", "Name", "Description"],
    include: [
      {
        separate: true,
        model: db.GroupMessageParticipantModel,
        as: "MessagingGroupIdGroupMessagesData",
        order: [["Type", "ASC"]],
        attributes: ["_id", "Type"],
        include: [
          {
            model: db.EmployeeModel,
            as: "ParticipantIdGroupMessageParticipant",
            attributes: ["_id", "Name", "Image"],
            include: [
              {
                model: db.DesignationModel,
                as: "DesignationData",
                attributes: ["_id", "Name"]
              }
            ]
          }
        ]
      },
      {
        model: db.ProjectModel,
        as: "ProjectGroupData",
        attributes: ["_id", "Name", "Description", "RecurringMeetingDay"]
      }
    ]
  });
  console.log(MessagesGroupOfParticipant);
  res.status(200).json({
    success: true,
    data
  });
});
exports.UserGroupDetail = Trackerror(async (req, res, next) => {
  const data = await db.GroupMessagesModel.findAll({
    where: {
      MessagingGroupId: req.params.id
    },
    order: [["createdAt", "Desc"]],
    attributes: ["_id", "Body", "createdAt"],
    include: [
      {
        model: db.EmployeeModel,
        as: "SenderIdMessageData",
        attributes: ["_id", "Name", "Email", "Image"],
        include: [
          {
            model: db.DesignationModel,
            as: "DesignationData",
            attributes: ["_id", "Name"]
          }
        ]
      },
      {
        model: db.GroupMessageMediaModel,
        as: "GroupMessageIdMessageData",
        attributes: ["_id", "Media", "Type"]
      }
    ]
  });
  res.status(200).json({
    success: true,
    data
  });
});
exports.SendMessageOnGroup = Trackerror(async (req, res, next) => {
  const { Body } = req.body;

  const message = await db.GroupMessagesModel.create({
    MessagingGroupId: req.params.id,
    SenderId: req.user.Employee,

    Body: Body,
    Ceo: req.user.Ceo
  });
  //   console.log(req.params.id);

  if (req.files) {
    if (Array.isArray(req?.files?.image) === false) {
      const file = req.files.image;

      const Image = generateFileName();
      await uploadFile(
        req.files.image.data,
        `${GroupMedia}/${Image}`,
        file.mimetype
      );
      await db.GroupMessageMediaModel.create({
        GroupMessageId: message._id,
        Media: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${GroupMedia}/${Image}`,
        Type: file.mimetype,
        Ceo: req.user.Ceo
      });
    }
    if (Array.isArray(req?.files?.image) === true) {
      const files = req.files.image;
      files.map(async (SingleImage) => {
        const Image = generateFileName();
        await uploadFile(
          SingleImage.data,
          `${GroupMedia}/${Image}`,
          SingleImage.mimetype
        );
        await db.GroupMessageMediaModel.create({
          GroupMessageId: message._id,
          Media: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${GroupMedia}/${Image}`,
          Type: SingleImage.mimetype,
          Ceo: req.user.Ceo
        });
      });
    }
  }
  const sendData = await db.GroupMessagesModel.findOne({
    where: {
      _id: message._id
    },
    attributes: ["_id", "Body", "createdAt"],
    include: [
      {
        model: db.EmployeeModel,
        as: "SenderIdMessageData",
        attributes: ["_id", "Name", "Email", "Image"],
        include: [
          {
            model: db.DesignationModel,
            as: "DesignationData",
            attributes: ["_id", "Name"]
          }
        ]
      },
      {
        model: db.GroupMessageMediaModel,
        as: "GroupMessageIdMessageData",
        attributes: ["_id", "Media", "Type"]
      }
    ]
  });
  io.getIo().to(req.params.id).emit("GroupMessage", sendData);
  res.status(200).json({
    success: true,
    message: sendData
  });
});
exports.SendMessageOnPeer = Trackerror(async (req, res, next) => {
  const { Body } = req.body;
  const { id } = req.params;
  let ConversationId = `${id}/${req.user.Employee}`;
  const FindConversationId = await db.MessagingModel.findOne({
    where: {
      [Op.or]: [
        {
          ConversationId: `${id}/${req.user.Employee}`
        },
        {
          ConversationId: `${req.user.Employee}/${id}`
        }
      ]
    },
    raw: true
  });
  console.log(FindConversationId);
  if (FindConversationId) {
    ConversationId = FindConversationId.ConversationId;
  }

  const message = await db.MessagingModel.create({
    SenderId: req.user.Employee,
    ReceiverId: req.params.id,
    Body: Body,
    ConversationId: ConversationId,
    Ceo: req.user.Ceo
  });
  if (req.files) {
    if (Array.isArray(req.files?.image) === false) {
      const file = req.files.image;

      const Image = generateFileName();
      await uploadFile(
        req.files.image.data,
        `${PeerMedia}/${Image}`,
        file.mimetype
      );
      await db.MessageMediaModel.create({
        MessageId: message._id,
        Media: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${PeerMedia}/${Image}`,
        Type: file.mimetype,
        Ceo: req.user.Ceo
      });
    }
    if (Array.isArray(req.files?.image) === true) {
      const files = req.files.image;
      files.map(async (SingleImage) => {
        const Image = generateFileName();
        await uploadFile(
          SingleImage.data,
          `${PeerMedia}/${Image}`,
          SingleImage.mimetype
        );
        await db.MessageMediaModel.create({
          MessageId: message._id,
          Media: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${PeerMedia}/${Image}`,
          Type: SingleImage.mimetype,
          Ceo: req.user.Ceo
        });
      });
    }
  }
//   console.log("debug");
  const sendData = await db.MessagingModel.findOne({
    where: {
      _id: message._id
    },
    attributes: ["_id", "Body", "SenderId", "ReceiverId", "createdAt"],
    // order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.MessageMediaModel,
        as: "EmployeeMessageMedia"
      }
    ]
  });
  io.getIo().to(ConversationId).emit("PeerUser", sendData);
  res.status(200).json({
    success: true,
    message: sendData
  });
});
