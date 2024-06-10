const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config({ path: "./config/Secrets.env" });
let options = {
  host: process.env.RDSHOST,
  port: 3306,
  maxConcurrentQueries: 100,
  dialect: "mysql",
  pool: { maxDbions: 5, maxIdleTime: 30 },
  language: "en",
  Protocol: "TCP",
  logging: true
};
let Db;
if (process.env.DBENV == "production" || process.env.DBENV == "staging") {
  console.log("DB Connection Trial On Production/Staging");
  Db = new Sequelize(
    process.env.RDSDB,
    process.env.RDSUSER,
    process.env.RDSPASSWORD,
    {
      ...options
    }
  );
} else {
  Db = new Sequelize(
    process.env.SQLDB,
    process.env.SQLHOST,
    process.env.SQLPASSWORD,
    {
      dialect: "mysql",
      port: process.env.DBPORT || 3306,
      // acquire: 80000,
      logging: false
    }
  );
  console.log("DB Connection Trial On Development");
}

Db.authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = Db;
db.sequelize.sync({ force: false, alter: false }).then(async () => {
  console.log("yes re-sync done!");
});

db.EmployeeDocumentModel = require("../Models/EmployeeDocumentModel")(
  Db,
  DataTypes
);
db.ProjectDocumentModel = require("../Models/ProjectDocumentModel")(
  Db,
  DataTypes
);
db.MessageMediaModel = require("../Models/MessageMediaModel")(Db, DataTypes);
db.MessagingGroupModel = require("../Models/MessagingGroupModel")(
  Db,
  DataTypes
);
db.GroupMessageMediaModel = require("../Models/GroupMessageMediaModel")(
  Db,
  DataTypes
);
db.GroupMessageParticipantModel =
  require("../Models/GroupMessageParticipantModel")(Db, DataTypes);
db.GroupMessagesModel = require("../Models/GroupMessagesModel")(Db, DataTypes);
db.MeetingModel = require("../Models/MeetingModel")(Db, DataTypes);
db.AttendanceModel = require("../Models/AttendanceModel")(Db, DataTypes);
db.CeoModel = require("../Models/CeoModel")(Db, DataTypes);
db.CityModel = require("../Models/CityModel")(Db, DataTypes);
db.CompanyDetailModel = require("../Models/CompanyDetailModel")(Db, DataTypes);
db.ProjectSectionModel = require("../Models/ProjectSectionModel")(
  Db,
  DataTypes
);
db.OrganizationDetailModel = require("../Models/OrganizationDetailModel")(
  Db,
  DataTypes
);
db.CompanyThemeModel = require("../Models/CompanyThemeModel")(Db, DataTypes);
db.CountryModel = require("../Models/CountryModel")(Db, DataTypes);
db.DesignationModel = require("../Models/DesignationModel")(Db, DataTypes);
db.EmployeeModel = require("../Models/EmployeeModel")(Db, DataTypes);
// db.EmployeePayroll = require("../Models/EmployeePayroll")(Db, DataTypes);
db.MartialStatusModel = require("../Models/MartialStatusModel")(Db, DataTypes);
db.MessagingModel = require("../Models/MessagingModel")(Db, DataTypes);
// db.NationalityModel = require("../Models/NationalityModel")(Db, DataTypes);
db.OrganizationTypeModel = require("../Models/OrganizationTypeModel")(
  Db,
  DataTypes
);
db.ProjectModel = require("../Models/ProjectModel")(Db, DataTypes);
db.EmployeeTaskModel = require("../Models/EmployeeTaskModel")(Db, DataTypes);
db.StateModel = require("../Models/StateModel")(Db, DataTypes);

db.EmployeeModel.hasMany(db.GroupMessagesModel, {
  foreignKey: "SenderId",
  as: "SenderIdMessageData"
});

db.GroupMessagesModel.belongsTo(db.EmployeeModel, {
  foreignKey: "SenderId",
  as: "SenderIdMessageData"
});
db.CeoModel.hasMany(db.GroupMessagesModel, {
  foreignKey: "Ceo",
  as: "CeoMessageData"
});

db.GroupMessagesModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoMessageData"
});
db.GroupMessageParticipantModel.belongsTo(db.MessagingGroupModel, {
  foreignKey: "MessagingGroupId",
  as: "MessagingGroupIdGroupMessagesData"
});
db.MessagingGroupModel.hasMany(db.GroupMessageParticipantModel, {
  foreignKey: "MessagingGroupId",
  as: "MessagingGroupIdGroupMessagesData"
});
db.GroupMessageParticipantModel.belongsTo(db.EmployeeModel, {
  foreignKey: "ParticipantId",
  as: "ParticipantIdGroupMessageParticipant"
});
db.EmployeeModel.hasMany(db.GroupMessageParticipantModel, {
  foreignKey: "ParticipantId",
  as: "ParticipantIdGroupMessageParticipant"
});
db.GroupMessageParticipantModel.belongsTo(db.GroupMessagesModel, {
  foreignKey: "MessagingGroupId",
  as: "MessagingGroupIdGroupMessageParticipant"
});
db.GroupMessagesModel.hasMany(db.GroupMessageParticipantModel, {
  foreignKey: "MessagingGroupId",
  as: "MessagingGroupIdGroupMessageParticipant"
});
db.CeoModel.hasMany(db.GroupMessageParticipantModel, {
  foreignKey: "Ceo",
  as: "CeoGroupMessageParticipant"
});
db.GroupMessageParticipantModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoGroupMessageParticipant"
});
db.CeoModel.hasMany(db.GroupMessageMediaModel, {
  foreignKey: "Ceo",
  as: "CeoGroupMessageMedia"
});
db.GroupMessageMediaModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoGroupMessageMedia"
});
db.GroupMessageMediaModel.belongsTo(db.GroupMessagesModel, {
  foreignKey: "GroupMessageId",
  as: "GroupMessageIdMessageData"
});

db.GroupMessagesModel.hasMany(db.GroupMessageMediaModel, {
  foreignKey: "GroupMessageId",
  as: "GroupMessageIdMessageData"
});

db.MessagingModel.hasMany(db.MessageMediaModel, {
  foreignKey: "MessageId",
  as: "EmployeeMessageMedia"
});

db.MessageMediaModel.belongsTo(db.MessagingModel, {
  foreignKey: "MessageId",
  as: "EmployeeMessageMedia"
});
db.ProjectModel.hasOne(db.MessagingGroupModel, {
  foreignKey: "ProjectId",
  as: "ProjectGroupData"
});
db.MessagingGroupModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "ProjectGroupData"
});

db.EmployeeModel.hasOne(db.MessagingGroupModel, {
  foreignKey: "CreatedBy",
  as: "ProjectGroupEmployeeData"
});
db.MessagingGroupModel.belongsTo(db.EmployeeModel, {
  foreignKey: "CreatedBy",
  as: "ProjectGroupEmployeeData"
});

db.EmployeeModel.hasMany(db.EmployeeDocumentModel, {
  foreignKey: "EmployeeId",
  as: "EmployeeDocumentData"
});

db.EmployeeDocumentModel.belongsTo(db.EmployeeModel, {
  foreignKey: "EmployeeId",
  as: "EmployeeDocumentData"
});
db.ProjectSectionModel.hasMany(db.EmployeeTaskModel, {
  foreignKey: "ProjectSection",
  as: "ProjectSectionData"
});
db.EmployeeTaskModel.belongsTo(db.ProjectSectionModel, {
  foreignKey: "ProjectSection",
  as: "ProjectSectionData"
});
db.ProjectModel.hasMany(db.ProjectSectionModel, {
  foreignKey: "ProjectId",
  as: "CompanyProjectSectionData"
});
db.ProjectSectionModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "CompanyProjectSectionData"
});
// db.CompanyDetailModel.belongsTo(db.CeoModel, {
//   foreignKey: "Ceo",
//   as: "CeoCompanyDetail",
// });
db.CeoModel.belongsTo(db.CompanyDetailModel, {
  foreignKey: "CompanyId",
  as: "CeoCompanyDetailCompanyId"
});
db.AttendanceModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "AttendanceData"
});
// db.DesignationModel.belongsTo(db.CeoModel, {
//   foreignKey: "Ceo",
//   as: "CeoDesignationData",
// });
db.EmployeeDocumentModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "EmployeesDocumentData"
});
db.EmployeeModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoEmployeeData"
});
db.EmployeeTaskModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "EmployeeTaskDetails"
});
// db.MartialStatusModel.belongsTo(db.CeoModel, {
//   foreignKey: "Ceo",
//   as: "CompanyMartialStatusData",
// });
db.MessagingModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CompanyMessages"
});
db.OrganizationDetailModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoCompanyDetails"
});
db.ProjectDocumentModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoProjectDocument"
});
db.ProjectModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoProjectsDetail"
});

db.EmployeeModel.hasMany(db.AttendanceModel, {
  foreignKey: "Employee",
  as: "EmployeeAttendanceData"
});
db.AttendanceModel.belongsTo(db.EmployeeModel, {
  foreignKey: "Employee",
  as: "EmployeeAttendanceData"
});
db.EmployeeModel.hasMany(db.AttendanceModel, {
  foreignKey: "Approver",
  as: "ApproverAttendanceData"
});
db.AttendanceModel.belongsTo(db.EmployeeModel, {
  foreignKey: "Approver",
  as: "ApproverAttendanceData"
});

// db.CeoModel.hasMany(db.CompanyDetailModel, {
//   foreignKey: "CompanyId",
//   as: "CompanyDetailModel",
// });
// db.CompanyDetailModel.belongsTo(db.CeoModel, {
//   foreignKey: "CompanyId",
//   as: "CompanyDetailModel",
// });
db.StateModel.hasMany(db.CityModel, {
  foreignKey: "state_id",
  as: "StateData"
});
db.CityModel.belongsTo(db.StateModel, {
  foreignKey: "state_id",
  as: "StateData"
});
db.CountryModel.hasMany(db.StateModel, {
  foreignKey: "country_id",
  as: "CountryData"
});
db.StateModel.belongsTo(db.CountryModel, {
  foreignKey: "country_id",
  as: "CountryData"
});
db.CompanyDetailModel.belongsTo(db.OrganizationTypeModel, {
  foreignKey: "OrganizationType",
  as: "OrganizationTypeData"
});
db.OrganizationTypeModel.hasMany(db.CompanyDetailModel, {
  foreignKey: "OrganizationType",
  as: "OrganizationTypeData"
});
db.CompanyThemeModel.hasMany(db.OrganizationDetailModel, {
  foreignKey: "CompanyTheme",
  as: "CompanyThemeData"
});
db.OrganizationDetailModel.belongsTo(db.CompanyThemeModel, {
  foreignKey: "CompanyTheme",
  as: "CompanyThemeData"
});
db.CompanyDetailModel.hasMany(db.EmployeeModel, {
  foreignKey: "CompanyId",
  as: "CompanyIdData"
});
db.EmployeeModel.belongsTo(db.CompanyDetailModel, {
  foreignKey: "CompanyId",
  as: "CompanyIdData"
});
db.DesignationModel.hasMany(db.EmployeeModel, {
  foreignKey: "Designation",
  as: "DesignationData"
});
db.EmployeeModel.belongsTo(db.DesignationModel, {
  foreignKey: "Designation",
  as: "DesignationData"
});
db.EmployeeModel.belongsTo(db.EmployeeModel, {
  foreignKey: "ReportingAuthority",
  as: "ReportingAuthorityData"
});
db.CityModel.hasMany(db.EmployeeModel, {
  foreignKey: "City",
  as: "CityData"
});
db.EmployeeModel.belongsTo(db.CityModel, {
  foreignKey: "City",
  as: "CityData"
});
db.MartialStatusModel.hasMany(db.EmployeeModel, {
  foreignKey: "MartialStatus",
  as: "MartialStatusData"
});
db.EmployeeModel.belongsTo(db.MartialStatusModel, {
  foreignKey: "MartialStatus",
  as: "MartialStatusData"
});
db.EmployeeModel.hasMany(db.EmployeeTaskModel, {
  foreignKey: "AssignBy",
  as: "AssignByData"
});
db.EmployeeTaskModel.belongsTo(db.EmployeeModel, {
  foreignKey: "AssignBy",
  as: "AssignByData"
});
db.EmployeeModel.hasMany(db.EmployeeTaskModel, {
  foreignKey: "AssignTo",
  as: "AssignToData"
});
db.EmployeeTaskModel.belongsTo(db.EmployeeModel, {
  foreignKey: "AssignTo",
  as: "AssignToData"
});
db.ProjectModel.hasMany(db.ProjectDocumentModel, {
  foreignKey: "ProjectId",
  as: "ProjectDocumentData"
});
db.ProjectDocumentModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "ProjectDocumentData"
});
db.ProjectModel.hasMany(db.EmployeeTaskModel, {
  foreignKey: "ProjectId",
  as: "ProjectTaskData"
});
db.EmployeeTaskModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "ProjectTaskData"
});
db.EmployeeModel.hasMany(db.MessagingModel, {
  foreignKey: "SenderId",
  as: "SenderIdData"
});
db.MessagingModel.belongsTo(db.EmployeeModel, {
  foreignKey: "SenderId",
  as: "SenderIdData"
});
db.EmployeeModel.hasMany(db.MessagingModel, {
  foreignKey: "ReceiverId",
  as: "ReceiverIdData"
});
db.MessagingModel.belongsTo(db.EmployeeModel, {
  foreignKey: "ReceiverId",
  as: "ReceiverIdData"
});
db.EmployeeModel.hasMany(db.ProjectModel, {
  foreignKey: "ProjectCreatedBy",
  as: "ProjectCreatedByData"
});
db.ProjectModel.belongsTo(db.EmployeeModel, {
  foreignKey: "ProjectCreatedBy",
  as: "ProjectCreatedByData"
});
db.EmployeeModel.hasMany(db.ProjectModel, {
  foreignKey: "ProjectAssignTo",
  as: "ProjectAssignToData"
});
db.ProjectModel.belongsTo(db.EmployeeModel, {
  foreignKey: "ProjectAssignTo",
  as: "ProjectAssignToData"
});
db.EmployeeModel.hasMany(db.MeetingModel, {
  foreignKey: "MeetingCreatedBy",
  as: "MeetingCreatedByData"
});
db.MeetingModel.belongsTo(db.EmployeeModel, {
  foreignKey: "MeetingCreatedBy",
  as: "MeetingCreatedByData"
});
db.EmployeeModel.hasMany(db.MeetingModel, {
  foreignKey: "Employee",
  as: "EmployeeMeetingData"
});
db.MeetingModel.belongsTo(db.EmployeeModel, {
  foreignKey: "Employee",
  as: "EmployeeMeetingData"
});
db.ProjectModel.hasMany(db.MeetingModel, {
  foreignKey: "ProjectId",
  as: "ProjectIdMeetingData"
});
db.MeetingModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "ProjectIdMeetingData"
});
db.CeoModel.hasMany(db.MeetingModel, {
  foreignKey: "Ceo",
  as: "CeoMeetingData"
});
db.MeetingModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoMeetingData"
});

db.CeoModel.hasMany(db.MessagingGroupModel, {
  foreignKey: "Ceo",
  as: "CeoMessageGroupDetail"
});
db.MessagingGroupModel.belongsTo(db.CeoModel, {
  foreignKey: "Ceo",
  as: "CeoMessageGroupDetail"
});
db.ProjectModel.hasOne(db.MessagingGroupModel, {
  foreignKey: "ProjectId",
  as: "ProjectMessagingGroup"
});
db.MessagingGroupModel.belongsTo(db.ProjectModel, {
  foreignKey: "ProjectId",
  as: "ProjectMessagingGroup"
});

module.exports = db;
