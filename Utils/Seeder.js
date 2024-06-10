// insertData.js
const fs = require("fs");
// const { CountryModel, StateModel, CityModel } = require('./models'); // Adjust the path as per your project structure
const db = require("../config/Connection");
const path = require("path");
const bcrypt = require("bcrypt");
const moment = require("moment");
async function InsertCountryData() {
  try {
    const Country = fs.readFileSync(
      path.join(__dirname, "..", "Utils", "CountryDetail.json")
    );
    const CountryData = JSON.parse(Country);
    const State = fs.readFileSync(
      path.join(__dirname, "..", "Utils", "StateDetail.json")
    );
    const StateData = JSON.parse(State);
    const City = fs.readFileSync(
      path.join(__dirname, "..", "Utils", "CityDetail.json")
    );
    const CityData = JSON.parse(City);
    // const data = JSON.parse(rawData);
    await db.CountryModel.bulkCreate(CountryData);
    console.log("Country Entered");
    await db.StateModel.bulkCreate(StateData);
    console.log("State Entered");
    await db.CityModel.bulkCreate(CityData);
    console.log("City Entered");

    console.log("Customer Data Is Being Entered Wait");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
  InsertData();
  //   console.log("Customer Data Is Being Entered");
  //   console.log("Seeding Complete");
}
async function InsertData() {
  try {
    const DesignationData = [
      {
        Name: "Software Engineer",
        Description: "Develops and maintains software applications."
      },
      {
        Name: "Web Developer",
        Description: "Specializes in building and maintaining websites."
      },
      {
        Name: "Database Administrator",
        Description:
          "Manages and organizes databases for efficient data storage."
      },
      {
        Name: "Network Engineer",
        Description: "Designs and manages computer networks."
      },
      {
        Name: "UI/UX Designer",
        Description: "Creates user interfaces and enhances user experiences."
      },
      {
        Name: "QA Engineer",
        Description:
          "Ensures the quality and functionality of software products."
      },
      {
        Name: "DevOps Engineer",
        Description:
          "Focuses on improving collaboration between development and operations teams."
      },
      {
        Name: "Systems Analyst",
        Description:
          "Analyzes and designs information systems for organizations."
      },
      {
        Name: "Mobile App Developer",
        Description: "Develops applications for mobile devices."
      },
      {
        Name: "Data Scientist",
        Description: "Analyzes and interprets complex data sets."
      },
      {
        Name: "IT Consultant",
        Description:
          "Advises organizations on how to use technology to meet their business objectives."
      },
      {
        Name: "Cybersecurity Analyst",
        Description:
          "Protects computer systems and networks from cyber threats."
      },
      {
        Name: "Cloud Solutions Architect",
        Description: "Designs and manages cloud infrastructure and services."
      },
      {
        Name: "Machine Learning Engineer",
        Description: "Builds and deploys machine learning models."
      },
      {
        Name: "Embedded Systems Engineer",
        Description: "Develops software for embedded systems."
      },
      {
        Name: "Business Analyst",
        Description:
          "Analyzes business processes and recommends improvements using technology."
      },
      {
        Name: "Full Stack Developer",
        Description:
          "Works on both the front-end and back-end of web applications."
      },
      {
        Name: "AI Research Scientist",
        Description:
          "Conducts research to advance the field of artificial intelligence."
      },
      {
        Name: "Game Developer",
        Description: "Creates video games for various platforms."
      },
      {
        Name: "Network Security Specialist",
        Description:
          "Focuses on securing computer networks from unauthorized access."
      },
      {
        Name: "Systems Administrator",
        Description: "Manages and maintains computer systems and servers."
      },
      {
        Name: "IT Support Specialist",
        Description:
          "Provides technical support to end-users and resolves IT issues."
      },
      {
        Name: "Front-end Developer",
        Description:
          "Focuses on designing and implementing the user interface of websites."
      },
      {
        Name: "Back-end Developer",
        Description:
          "Manages server-side logic and database interactions for web applications."
      },
      {
        Name: "Blockchain Developer",
        Description: "Builds applications using blockchain technology."
      },
      {
        Name: "Robotics Engineer",
        Description: "Designs and builds robots for various applications."
      },
      {
        Name: "Business Intelligence Analyst",
        Description:
          "Analyzes and interprets business data to provide insights."
      },
      {
        Name: "IT Project Manager",
        Description:
          "Oversees and manages IT projects from initiation to completion."
      },
      {
        Name: "UX Researcher",
        Description:
          "Conducts research to understand user needs and preferences."
      },
      {
        Name: "Technical Writer",
        Description:
          "Creates documentation for software and technical processes."
      },
      {
        Name: "Network Administrator",
        Description: "Manages and maintains computer networks."
      },
      {
        Name: "Data Engineer",
        Description:
          "Designs and develops systems for collecting and analyzing data."
      },
      {
        Name: "IT Auditor",
        Description:
          "Assesses and evaluates IT systems for security and compliance."
      },
      {
        Name: "IoT Developer",
        Description:
          "Creates applications for the Internet of Things (IoT) devices."
      },
      {
        Name: "Quantum Computing Scientist",
        Description: "Researches and develops algorithms for quantum computers."
      },
      {
        Name: "AR/VR Developer",
        Description:
          "Builds applications for augmented and virtual reality experiences."
      },
      {
        Name: "IT Trainer",
        Description: "Provides training on IT tools and technologies."
      },
      {
        Name: "Embedded Software Engineer",
        Description: "Develops software for embedded systems."
      },
      {
        Name: "Data Analyst",
        Description:
          "Analyzes and interprets data to help organizations make informed decisions."
      },
      {
        Name: "Computer Vision Engineer",
        Description:
          "Develops algorithms for interpreting visual information from the world."
      },
      {
        Name: "Bioinformatics Scientist",
        Description:
          "Applies computational techniques to biological data for research."
      },
      {
        Name: "Technical Support Engineer",
        Description:
          "Assists customers with technical issues and provides support."
      },
      {
        Name: "IT Security Analyst",
        Description:
          "Monitors and protects an organization's IT infrastructure from security threats."
      },
      {
        Name: "Systems Engineer",
        Description: "Designs and manages complex systems and infrastructure."
      },
      {
        Name: "Automation Engineer",
        Description:
          "Implements automated solutions for repetitive tasks and processes."
      },
      {
        Name: "Software Architect",
        Description: "Designs high-level structures for software projects."
      },
      {
        Name: "Geospatial Analyst",
        Description:
          "Analyzes and interprets geographic data for mapping and decision-making."
      },
      {
        Name: "Desktop Support Technician",
        Description: "Provides technical support for desktop computer systems."
      },
      {
        Name: "Health IT Specialist",
        Description:
          "Focuses on implementing and managing IT systems in healthcare settings."
      },
      {
        Name: "E-commerce Developer",
        Description:
          "Builds and maintains online shopping platforms and websites."
      },
      {
        Name: "Multimedia Developer",
        Description: "Creates multimedia content for various applications."
      },
      {
        Name: "Business Systems Analyst",
        Description:
          "Analyzes and improves business processes using technology solutions."
      },
      {
        Name: "IT Business Analyst",
        Description:
          "Analyzes and improves IT processes to meet business objectives."
      },
      {
        Name: "Virtualization Engineer",
        Description:
          "Implements and manages virtualization technologies for IT infrastructure."
      },
      {
        Name: "Information Security Officer",
        Description:
          "Oversees and manages an organization's information security policies."
      },
      {
        Name: "IT Risk Analyst",
        Description:
          "Assesses and manages IT-related risks within an organization."
      },
      {
        Name: "Wireless Network Engineer",
        Description: "Designs and manages wireless communication networks."
      },
      {
        Name: "GIS Specialist",
        Description:
          "Uses Geographic Information Systems for spatial analysis and mapping."
      },
      {
        Name: "ERP Consultant",
        Description:
          "Provides expertise in implementing and managing Enterprise Resource Planning systems."
      }
    ];
    const ThemeData = [
      {
        Name: "Palette1",
        PrimaryDayColor: "#ff5733",
        SecondaryDayColor: "#33ff57",
        PrimaryDayFontColor: "#ffffff",
        SecondaryDayFontColor: "#000000",
        PrimaryNightColor: "#ff5733",
        SecondaryNightColor: "#33ff57",
        PrimaryNightFontColor: "#ffffff",
        SecondaryNightFontColor: "#000000",
        SuccessDayColor: "#34c38f",
        SuccessNightColor: "#34c38f2e",
        WarningDayColor: "#f1b44c",
        WarningNightColor: "#f1b44c2e",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette2",
        PrimaryDayColor: "#3498db",
        SecondaryDayColor: "#2ecc71",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#2980b9",
        SecondaryNightColor: "#27ae60",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#e67e22",
        WarningNightColor: "#d35400",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette3",
        PrimaryDayColor: "#8e44ad",
        SecondaryDayColor: "#f39c12",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#2c3e50",
        PrimaryNightColor: "#9b59b6",
        SecondaryNightColor: "#f1c40f",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#34495e",
        SuccessDayColor: "#27ae60",
        SuccessNightColor: "#229954",
        WarningDayColor: "#e74c3c",
        WarningNightColor: "#c0392b",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette4",
        PrimaryDayColor: "#e74c3c",
        SecondaryDayColor: "#3498db",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#c0392b",
        SecondaryNightColor: "#2980b9",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f1c40f",
        WarningNightColor: "#f39c12",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette5",
        PrimaryDayColor: "#16a085",
        SecondaryDayColor: "#8e44ad",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#1abc9c",
        SecondaryNightColor: "#9b59b6",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#27ae60",
        SuccessNightColor: "#229954",
        WarningDayColor: "#e67e22",
        WarningNightColor: "#d35400",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette6",
        PrimaryDayColor: "#2ecc71",
        SecondaryDayColor: "#e74c3c",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#27ae60",
        SecondaryNightColor: "#c0392b",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f39c12",
        WarningNightColor: "#f1c40f",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette7",
        PrimaryDayColor: "#f1c40f",
        SecondaryDayColor: "#e67e22",
        PrimaryDayFontColor: "#2c3e50",
        SecondaryDayFontColor: "#ecf0f1",
        PrimaryNightColor: "#f39c12",
        SecondaryNightColor: "#d35400",
        PrimaryNightFontColor: "#34495e",
        SecondaryNightFontColor: "#bdc3c7",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#e74c3c",
        WarningNightColor: "#c0392b",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette8",
        PrimaryDayColor: "#9b59b6",
        SecondaryDayColor: "#34495e",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#2c3e50",
        PrimaryNightColor: "#8e44ad",
        SecondaryNightColor: "#2c3e50",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#34495e",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#e67e22",
        WarningNightColor: "#d35400",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette9",
        PrimaryDayColor: "#2980b9",
        SecondaryDayColor: "#e74c3c",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#3498db",
        SecondaryNightColor: "#c0392b",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f39c12",
        WarningNightColor: "#f1c40f",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette10",
        PrimaryDayColor: "#16a085",
        SecondaryDayColor: "#f39c12",
        PrimaryDayFontColor: "#2c3e50",
        SecondaryDayFontColor: "#ecf0f1",
        PrimaryNightColor: "#1abc9c",
        SecondaryNightColor: "#f1c40f",
        PrimaryNightFontColor: "#34495e",
        SecondaryNightFontColor: "#bdc3c7",
        SuccessDayColor: "#27ae60",
        SuccessNightColor: "#229954",
        WarningDayColor: "#e74c3c",
        WarningNightColor: "#c0392b",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette11",
        PrimaryDayColor: "#2c3e50",
        SecondaryDayColor: "#8e44ad",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#34495e",
        SecondaryNightColor: "#9b59b6",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f39c12",
        WarningNightColor: "#f1c40f",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette12",
        PrimaryDayColor: "#27ae60",
        SecondaryDayColor: "#e74c3c",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#34495e",
        PrimaryNightColor: "#2ecc71",
        SecondaryNightColor: "#c0392b",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#2c3e50",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f39c12",
        WarningNightColor: "#f1c40f",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette13",
        PrimaryDayColor: "#f1c40f",
        SecondaryDayColor: "#16a085",
        PrimaryDayFontColor: "#2c3e50",
        SecondaryDayFontColor: "#ecf0f1",
        PrimaryNightColor: "#f39c12",
        SecondaryNightColor: "#1abc9c",
        PrimaryNightFontColor: "#34495e",
        SecondaryNightFontColor: "#bdc3c7",
        SuccessDayColor: "#27ae60",
        SuccessNightColor: "#229954",
        WarningDayColor: "#e74c3c",
        WarningNightColor: "#c0392b",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette14",
        PrimaryDayColor: "#34495e",
        SecondaryDayColor: "#3498db",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#2c3e50",
        PrimaryNightColor: "#2c3e50",
        SecondaryNightColor: "#2980b9",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#34495e",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#e67e22",
        WarningNightColor: "#d35400",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      },
      {
        Name: "Palette15",
        PrimaryDayColor: "#e74c3c",
        SecondaryDayColor: "#9b59b6",
        PrimaryDayFontColor: "#ecf0f1",
        SecondaryDayFontColor: "#2c3e50",
        PrimaryNightColor: "#c0392b",
        SecondaryNightColor: "#8e44ad",
        PrimaryNightFontColor: "#bdc3c7",
        SecondaryNightFontColor: "#34495e",
        SuccessDayColor: "#1abc9c",
        SuccessNightColor: "#16a085",
        WarningDayColor: "#f39c12",
        WarningNightColor: "#f1c40f",
        ErrorDayColor: "#f46a6a",
        ErrorNightColor: "#f46a6a2e"
      }
    ];
    const OrganizationTypeData = [
      {
        Name: "Corporation",
        Description:
          "A large company or group of companies authorized to act as a single entity and recognized as such in law."
      },
      {
        Name: "Startup",
        Description:
          "A newly established business, typically small, that is in the early stages of operation."
      },
      {
        Name: "Nonprofit Organization",
        Description:
          "An organization that operates for educational, charitable, scientific, artistic, or other socially beneficial purposes."
      },
      {
        Name: "Government Agency",
        Description:
          "A department or agency of a government responsible for the oversight and administration of specific functions."
      },
      {
        Name: "Small Business",
        Description:
          "A privately owned and operated business that is not dominant in its field and meets certain size standards."
      },
      {
        Name: "Educational Institution",
        Description:
          "An organization dedicated to providing education and training, such as schools, colleges, and universities."
      },
      {
        Name: "Healthcare Provider",
        Description:
          "An organization or individual that delivers medical services, including hospitals, clinics, and healthcare professionals."
      },
      {
        Name: "Technology Company",
        Description:
          "A company that specializes in the development and production of technology-related products or services."
      },
      {
        Name: "Financial Institution",
        Description:
          "An organization that provides financial services, such as banks, credit unions, and investment firms."
      },
      {
        Name: "Retail Business",
        Description:
          "A business that sells goods or services directly to consumers."
      },
      {
        Name: "Manufacturing Company",
        Description:
          "A company that produces goods through various processes, typically in a factory setting."
      },
      {
        Name: "Consulting Firm",
        Description:
          "A company or business that provides expert advice and services in a specific area."
      },
      {
        Name: "Entertainment Industry",
        Description:
          "An industry involved in the creation and distribution of entertainment content, including movies, music, and games."
      },
      {
        Name: "Research Institute",
        Description:
          "An organization focused on conducting research and advancing knowledge in various fields."
      },
      {
        Name: "Transportation Company",
        Description:
          "A company that provides transportation services, such as airlines, shipping companies, and logistics providers."
      }
    ];
    // const CompanyDetail =await db.CeoModel.create({
    //   Name:"Ab",
    //   OrganizationName:"Ab",
    //   OrganizationType:"Ab",
    //   Name:"Ab",
    // })
    const Single = db.MartialStatusModel.create({
      Name: "Single",
      Description: "Description"
    });
    const Married = db.MartialStatusModel.create({
      Name: "Married",
      Description: "Description"
    });
    // Access individual palettes like this:

    const DesignationDataInsertion = await db.DesignationModel.bulkCreate(
      DesignationData
    );
    const ThemeDataInsertion = await db.CompanyThemeModel.bulkCreate(ThemeData);
    const OrganizationTypeDataInsertion =
      await db.OrganizationTypeModel.bulkCreate(OrganizationTypeData);
    const FindTechCategory = await db.OrganizationTypeModel.findOne({
      where: {
        Name: "Technology Company"
      }
    });
    const CompanyData = await db.CompanyDetailModel.create({
      Name: "Zash Corps",
      OrganizationName: "Zash Corps",
      OrganizationType: FindTechCategory._id,
      EmailVerify: true,
      Email: "saadbhai642@gmail.com",
      PrimaryMobileNo: "03003344879"
    });
    const FindTheme = await db.CompanyThemeModel.findOne({
      where: {
        Name: "Palette15"
      }
    });
    const CeoData = await db.CeoModel.create({
      UserId: "UserCheck",
      Password: await bcrypt.hash("abc.123", 10),
      CompanyId: CompanyData._id
    });
    const OrganizatioNDetail = await db.OrganizationDetailModel.create({
      Name: "Zash Corps",
      Image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-lkijlO0g1F6MHKlfo2erxZ-z8FSlzTHRA&s",
      DisplayName: "Zash Corps",
      NoOfEmployees: 50,
      CompanyTheme: FindTheme._id,
      Ceo: CeoData._id
    });
    const SingleMartial = await db.MartialStatusModel.findOne({
      where: {
        Name: "Single"
      }
    });
    const BackendDeveloper = await db.DesignationModel.findOne({
      where: {
        Name: "Back-end Developer"
      }
    });
    const FrontendDeveloper = await db.DesignationModel.findOne({
      where: {
        Name: "Front-end Developer"
      }
    });
    const ProjectManager = await db.DesignationModel.findOne({
      where: {
        Name: "IT Project Manager"
      }
    });
    const QA = await db.DesignationModel.findOne({
      where: {
        Name: "QA Engineer"
      }
    });
    const BusinessAnalyst = await db.DesignationModel.findOne({
      where: {
        Name: "Business Analyst"
      }
    });
    const DevOps = await db.DesignationModel.findOne({
      where: {
        Name: "DevOps Engineer"
      }
    });
    const UIUX = await db.DesignationModel.findOne({
      where: {
        Name: "UI/UX Designer"
      }
    });
    const AppDeveloper = await db.DesignationModel.findOne({
      where: {
        Name: "Mobile App Developer"
      }
    });
    const Karachi = await db.CityModel.findOne({
      where: {
        name: "Karachi"
      }
    });
    // const LineManager=await db.EmployeeModel.create({

    // })
    const Employees = [
      {
        _id: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Name: "Jane Smith",
        Email: "employee2@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111112",
        IdentityNumber: 3424233424,
        DOB: "2002-01-03",
        DateOfJoining: "2020-05-02",
        MartialStatus: SingleMartial._id,
        Designation: FrontendDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Name: "Rafay",
        Email: "younggdev5@gmail.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111111",
        IdentityNumber: 3424233423,
        DOB: "2002-01-02",
        DateOfJoining: "2020-05-01",
        MartialStatus: SingleMartial._id,
        Designation: BackendDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        _id: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Name: "Robert Brown",
        Email: "employee3@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111113",
        IdentityNumber: 3424233425,
        DOB: "2002-01-04",
        DateOfJoining: "2020-05-03",
        MartialStatus: SingleMartial._id,
        Designation: ProjectManager._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "d59b299f-7d2d-4f17-9a17-c3d5d6c1f4f9",
        Name: "Emily Davis",
        Email: "employee4@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111114",
        IdentityNumber: 3424233426,
        DOB: "2002-01-05",
        DateOfJoining: "2020-05-04",
        MartialStatus: SingleMartial._id,
        Designation: DevOps._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        _id: "c6818e4b-408f-4314-97a1-4028b521b56b",
        Name: "Michael Johnson",
        Email: "employee5@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111115",
        IdentityNumber: 3424233427,
        DOB: "2002-01-06",
        DateOfJoining: "2020-05-05",
        MartialStatus: SingleMartial._id,
        Designation: BusinessAnalyst._id,
        City: Karachi._id,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "e815b8c4-6010-4b2c-b708-47e9a15d9b5b",
        Name: "Sarah Miller",
        Email: "employee6@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111116",
        IdentityNumber: 3424233428,
        DOB: "2002-01-07",
        DateOfJoining: "2020-05-06",
        MartialStatus: SingleMartial._id,
        Designation: AppDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        _id: "f1a9c89b-3d0f-4e41-b8d6-6b2f4e4c1a45",
        Name: "David Wilson",
        Email: "employee7@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111117",
        IdentityNumber: 3424233429,
        DOB: "2002-01-08",
        DateOfJoining: "2020-05-07",
        MartialStatus: SingleMartial._id,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Designation: FrontendDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "b8a39a7b-bff6-4d7b-861e-4998ad6f2f7b",
        Name: "Laura Anderson",
        Email: "employee8@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111118",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        IdentityNumber: 3424233430,
        DOB: "2002-01-09",
        DateOfJoining: "2020-05-08",
        MartialStatus: SingleMartial._id,
        Designation: QA._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "c9a1db9d-6c8d-4c5a-9344-7032f795de47",
        Name: "James Thomas",
        Email: "employee9@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111119",
        IdentityNumber: 3424233431,
        DOB: "2002-01-10",
        DateOfJoining: "2020-05-09",
        MartialStatus: SingleMartial._id,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Designation: QA._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "d4bc4b55-7d5c-4c3e-8e1b-829d4f749d55",
        Name: "Mary Martinez",
        Email: "employee10@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111120",
        IdentityNumber: 3424233432,
        DOB: "2002-01-11",
        DateOfJoining: "2020-05-10",
        MartialStatus: SingleMartial._id,
        Designation: QA._id,
        City: Karachi._id,
        Address: "Near Szabist",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "e5d9429e-2c3d-4f0b-a92f-e4e06460f8ff",
        Name: "Christopher Harris",
        Email: "employee11@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111121",
        IdentityNumber: 3424233433,
        DOB: "2002-01-12",
        DateOfJoining: "2020-05-11",
        MartialStatus: SingleMartial._id,
        Designation: DevOps._id,
        City: Karachi._id,
        Address: "Near Szabist",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "f7fddca9-d509-4e6c-9008-3be5c2a1e6f1",
        Name: "Patricia Clark",
        Email: "employee12@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111122",
        IdentityNumber: 3424233434,
        DOB: "2002-01-13",
        DateOfJoining: "2020-05-12",
        MartialStatus: SingleMartial._id,
        Designation: DevOps._id,
        City: Karachi._id,
        Address: "Near Szabist",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "b8eb4f3e-9d7f-4e2a-875d-f7d8c9ab8d55",
        Name: "Linda Lewis",
        Email: "employee13@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111123",
        IdentityNumber: 3424233435,
        DOB: "2002-01-14",
        DateOfJoining: "2020-05-13",
        MartialStatus: SingleMartial._id,
        Designation: BackendDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        ZipCode: 2345,
        Ceo: CeoData._id
      },
      {
        _id: "c4dc2b70-845a-4c95-9cf8-d3c38ffb8979",
        Name: "Barbara King",
        Email: "employee14@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111124",
        IdentityNumber: 3424233436,
        DOB: "2002-01-15",
        DateOfJoining: "2020-05-14",
        MartialStatus: SingleMartial._id,
        Designation: BackendDeveloper._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        _id: "f4ea1d92-d1d1-48d6-bb4e-9296bc183920",
        Name: "Susan Walker",
        Email: "employee15@company.com",
        Password: await bcrypt.hash("abc.123", 10),
        Image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
        CompanyId: CompanyData._id,
        Mobile: "0111111125",
        IdentityNumber: 3424233437,
        DOB: "2002-01-16",
        DateOfJoining: "2020-05-15",
        MartialStatus: SingleMartial._id,
        Designation: UIUX._id,
        City: Karachi._id,
        Address: "Near Szabist",
        PermanentAddress: "Near Szabist",
        ZipCode: 2345,
        ReportingAuthority: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      }
    ];
    const Projects = [
      {
        _id: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Name: "SaaS AI Image Recognition",
        Description:
          "Our SaaS AI Image Recognition platform leverages advanced artificial intelligence to provide robust and accurate image analysis and recognition capabilities. Designed for businesses across various industries, this solution streamlines and automates the process of identifying, categorizing, and analyzing visual data, helping organizations make data-driven decisions and improve operational efficiency.",
        RecurringMeetingDay: "monday",
        RecurringMeeting: true,
        ProjectCreatedBy: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Deadline: "2024-05-05",
        ProjectAssignTo: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        _id: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Name: "AI-Driven Marketing Analytics",
        Description:
          "This project focuses on developing an AI-driven marketing analytics platform that provides insights into customer behavior, campaign performance, and market trends, enabling businesses to optimize their marketing strategies and improve ROI.",
        RecurringMeetingDay: "tuesday",
        RecurringMeeting: true,
        ProjectCreatedBy: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Deadline: "2024-06-10",
        ProjectAssignTo: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        _id: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Name: "Automated Customer Support",
        Description:
          "Develop an automated customer support system utilizing AI chatbots and natural language processing to provide instant and accurate responses to customer inquiries, reducing response time and improving customer satisfaction.",
        RecurringMeetingDay: "wednesday",
        RecurringMeeting: true,
        ProjectCreatedBy: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Deadline: "2024-07-15",
        ProjectAssignTo: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        _id: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Name: "Predictive Maintenance for Manufacturing",
        Description:
          "Implement an AI-powered predictive maintenance system for manufacturing facilities to forecast equipment failures and schedule timely maintenance, thereby minimizing downtime and reducing operational costs.",
        RecurringMeetingDay: "thursday",
        RecurringMeeting: true,
        ProjectCreatedBy: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Deadline: "2024-08-20",
        ProjectAssignTo: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        _id: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Name: "AI-Powered Financial Forecasting",
        Description:
          "Create an AI-powered financial forecasting tool that leverages machine learning to analyze historical data and predict future financial trends, aiding businesses in strategic planning and decision-making.",
        RecurringMeetingDay: "friday",
        RecurringMeeting: true,
        ProjectCreatedBy: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Deadline: "2024-09-25",
        ProjectAssignTo: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      }
    ];
    const ProjectsSection = [
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "Near Future"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "ToDo"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "InProgress"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "Ready for Review"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "Review In Progress"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "Waiting On 3rd Party"
      },
      {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Title: "Shipped"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "Near Future"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "ToDo"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "InProgress"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "Ready for Review"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "Review In Progress"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "Waiting On 3rd Party"
      },
      {
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Title: "Shipped"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "Near Future"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "ToDo"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "InProgress"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "Ready for Review"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "Review In Progress"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "Waiting On 3rd Party"
      },
      {
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Title: "Shipped"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "Near Future"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "ToDo"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "InProgress"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "Ready for Review"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "Review In Progress"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "Waiting On 3rd Party"
      },
      {
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Title: "Shipped"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "Near Future"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "ToDo"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "InProgress"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "Ready for Review"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "Review In Progress"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "Waiting On 3rd Party"
      },
      {
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Title: "Shipped"
      }
    ];
    const BulkEmployee = await db.EmployeeModel.bulkCreate(Employees);
    const BulkProject = await db.ProjectModel.bulkCreate(Projects);
    const BulkProjectSection = await db.ProjectSectionModel.bulkCreate(
      ProjectsSection
    );
    const ProjectMessageGroup = [
      {
        _id: "02ad323f-31db-4097-a377-da69911d640d",
        Name: "SaaS AI Image Recognition",
        Description:
          "Our SaaS AI Image Recognition platform leverages advanced artificial intelligence to provide robust and accurate image analysis and recognition capabilities. Designed for businesses across various industries, this solution streamlines and automates the process of identifying, categorizing, and analyzing visual data, helping organizations make data-driven decisions and improve operational efficiency.",
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370",
        Ceo: CeoData._id
      },
      {
        Name: "AI-Driven Marketing Analytics",
        Description:
          "This project focuses on developing an AI-driven marketing analytics platform that provides insights into customer behavior, campaign performance, and market trends, enabling businesses to optimize their marketing strategies and improve ROI.",
        ProjectId: "9bfe0b2e-4c42-4eaa-b93b-1d89a65d2a9a",
        Ceo: CeoData._id
      },
      {
        Name: "Automated Customer Support",
        Description:
          "Develop an automated customer support system utilizing AI chatbots and natural language processing to provide instant and accurate responses to customer inquiries, reducing response time and improving customer satisfaction.",
        ProjectId: "2baf3f4a-92fa-48d5-a47f-57c5e47c1d5b",
        Ceo: CeoData._id
      },
      {
        Name: "Predictive Maintenance for Manufacturing",
        Description:
          "Implement an AI-powered predictive maintenance system for manufacturing facilities to forecast equipment failures and schedule timely maintenance, thereby minimizing downtime and reducing operational costs.",
        ProjectId: "f25e9c0f-b4a5-4d09-8d57-7f6463b571cb",
        Ceo: CeoData._id
      },
      {
        Name: "AI-Powered Financial Forecasting",
        Description:
          "Create an AI-powered financial forecasting tool that leverages machine learning to analyze historical data and predict future financial trends, aiding businesses in strategic planning and decision-making.",
        ProjectId: "36b5f741-5f50-4a72-95d5-b45a4ebc7bb6",
        Ceo: CeoData._id
      }
    ];
    const BulkBulkProjectMessageGroup = await db.MessagingGroupModel.bulkCreate(
      ProjectMessageGroup
    );
    const Messages = [
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdsadsadsadadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasddsadfarffq3  423erqdsadaadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "we",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "fafsafasfsafsafsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "afsafafasfsafsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "safasfafsagsdfhdhdhdfwetwtwetwetwe",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        ReceiverId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        SenderId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "fasfafa",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        Ceo: CeoData._id
      },
      {
        ReceiverId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        SenderId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "2342352sgsesdg",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "gsdgsgsdgsad wv343",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        ReceiverId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        SenderId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "fsafasfffffffasasfasfsafasfsafasffasfas",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "safasfsafasfsafasfsaf",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "wetwetwettwtew",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "fegweeqilknilanipfnaifnweinrioqnerionq",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        ReceiverId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        SenderId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        ReceiverId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        SenderId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Ceo: CeoData._id
      },
      {
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        ReceiverId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Body: "dsdasdadsa",
        ConversationId:
          "44b07aaa-1910-4a0d-a5c3-7823381cc259/a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Ceo: CeoData._id
      }
    ];
    const BulkMessages = await db.MessagingModel.bulkCreate(Messages);
    const SaaSMessageGroup = await db.MessagingGroupModel.findOne({
      where: {
        ProjectId: "3ab580b4-bc1e-405f-aa59-c6f6df774370"
      }
    });
    const MessageGroupMeeting = [
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Type: "Admin",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "d59b299f-7d2d-4f17-9a17-c3d5d6c1f4f9",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "c6818e4b-408f-4314-97a1-4028b521b56b",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "e815b8c4-6010-4b2c-b708-47e9a15d9b5b",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "f1a9c89b-3d0f-4e41-b8d6-6b2f4e4c1a45",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "b8a39a7b-bff6-4d7b-861e-4998ad6f2f7b",
        Type: "Participant",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        ParticipantId: "c9a1db9d-6c8d-4c5a-9344-7032f795de47",
        Type: "Participant",
        Ceo: CeoData._id
      }
    ];
    const BulkMessageGroupMeeting =
      await db.GroupMessageParticipantModel.bulkCreate(MessageGroupMeeting);
    const GroupMessages = [
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      },
      {
        MessagingGroupId: SaaSMessageGroup._id,
        SenderId: "c6818e4b-408f-4314-97a1-4028b521b56b",
        Body: "aasdadasdafafasfasfasf",
        Ceo: CeoData._id
      }
    ];
    const BulkGroupMessages = await db.GroupMessagesModel.bulkCreate(
      GroupMessages
    );
    const AttendanceRecord = [];
    // AttendanceRecord.push({});
    const AllEmployees = await db.EmployeeModel.findAll({
      where: {
        Ceo: CeoData._id
      },
      raw: true
    });
    for (let i = 0; i < AllEmployees.length; i++) {
      const attendanceRecords = generateAttendanceRecords(
        AllEmployees[i]._id,
        CeoData._id
      );
      // AttendanceRecord.push(attendanceRecords);
      await db.AttendanceModel.bulkCreate(attendanceRecords);
    }
    // console.log(AttendanceRecord);
    // await db.AttendanceModel.bulkCreate(AttendanceRecord);
    // console.log(attendanceRecords);
  } catch (err) {
    console.log(err);
  }
}
function generateAttendanceRecords(employeeId, ceoId) {
  const records = [];
  const startDate = moment.utc("2023-05-01");
  const endDate = moment.utc();

  // Iterate over each day from startDate to endDate
  for (
    let date = startDate;
    date.isSameOrBefore(endDate);
    date.add(1, "days")
  ) {
    // Skip Saturdays and Sundays
    if (date.day() === 0 || date.day() === 6) {
      continue;
    }

    let attendanceStatus;
    let arrivalTime, departureTime;
    let leaveApprovalStatus = false;

    if (Math.random() < 0.1) {
      // 10% chance of being on Leave
      attendanceStatus = "Leave";
      leaveApprovalStatus = Math.random() < 0.9 ? true : false; // 90% chance of approval
      const arrivalHour = Math.floor(Math.random() * (11 - 10 + 1)) + 10; // Between 10 AM and 11 AM
      const arrivalMinute = Math.floor(Math.random() * 60); // Between 0 and 59 minutes
      arrivalTime = moment
        .utc(date)
        .set({ hour: arrivalHour, minute: arrivalMinute })
        .format("YYYY-MM-DD HH:mm:ss");
      departureTime = moment
        .utc(arrivalTime)
        .add(9, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
    } else {
      // Generate random arrival and departure times
      const arrivalHour = Math.floor(Math.random() * (10 - 8 + 1)) + 8; // Between 8 AM and 10 AM
      const arrivalMinute = Math.floor(Math.random() * 60); // Between 0 and 59 minutes
      const departureHour =
        arrivalHour + Math.floor(Math.random() * (19 - arrivalHour)) + 1; // Between arrival time and 7 PM
      const departureMinute = Math.floor(Math.random() * 60); // Between 0 and 59 minutes

      arrivalTime = moment
        .utc(date)
        .set({ hour: arrivalHour, minute: arrivalMinute })
        .format("YYYY-MM-DD HH:mm:ss");
      departureTime = moment
        .utc(date)
        .set({ hour: departureHour, minute: departureMinute })
        .format("YYYY-MM-DD HH:mm:ss");

      // Calculate the difference in hours
      const start = moment.utc(arrivalTime, "YYYY-MM-DD HH:mm:ss");
      const end = moment.utc(departureTime, "YYYY-MM-DD HH:mm:ss");
      const hoursDifference = moment.duration(end.diff(start)).asHours();

      // Determine the attendance status
      attendanceStatus = hoursDifference < 9 ? "LeaveEarlier" : "Present";
    }

    // Create the attendance record
    const record = {
      Day: date.format("YYYY-MM-DD"),
      Arrival: arrivalTime,
      Departure: departureTime,
      Employee: employeeId,
      Ceo: ceoId,
      AttendanceStatus: attendanceStatus,
      LeaveApprovalStatus: leaveApprovalStatus
    };

    // Add the record to the list
    records.push(record);
  }

  return records;
}

// async function InsertCompanyData() {
//   const FindTechCategory = await db.OrganizationTypeModel.findOne({
//     where: {
//       Name: "Technology Company",
//     },
//   });
//   const CompanyData = await db.CompanyDetailModel.create({
//     Name: "Zash Corps",
//     OrganizationName: "Zash Corps",
//     OrganizationType: FindTechCategory._id,
//     EmailVerify: true,
//     Email: "saadbhai642@gmail.com",
//     PrimaryMobileNo: "03003344879",
//   });
//   const FindTheme = await db.CompanyThemeModel.findOne({
//     where: {
//       Name: "Palette15",
//     },
//   });
//   const CeoData = await db.CeoModel.create({
//     UserId: "UserCheck",
//     Password: await bcrypt.hash("abc.123", 10),
//     CompanyId: CompanyData._id,
//     CompanyTheme: FindTheme._id,
//   });
//   const SingleMartial = await db.MartialStatusModel.findOne({
//     where: {
//       Name: "Single",
//     },
//   });
//   const BackendDeveloper = await db.DesignationModel.findOne({
//     where: {
//       Name: "Back-end Developer",
//     },
//   });
//   const FrontendDeveloper = await db.DesignationModel.findOne({
//     where: {
//       Name: "Front-end Developer",
//     },
//   });
//   const ProjectManager = await db.DesignationModel.findOne({
//     where: {
//       Name: "IT Project Manager",
//     },
//   });
//   const QA = await db.DesignationModel.findOne({
//     where: {
//       Name: "QA Engineer",
//     },
//   });
//   const BusinessAnalyst = await db.DesignationModel.findOne({
//     where: {
//       Name: "Business Analyst",
//     },
//   });
//   const DevOps = await db.DesignationModel.findOne({
//     where: {
//       Name: "DevOps Engineer",
//     },
//   });
//   const UIUX = await db.DesignationModel.findOne({
//     where: {
//       Name: "UI/UX Designer",
//     },
//   });
//   const AppDeveloper = await db.DesignationModel.findOne({
//     where: {
//       Name: "Mobile App Developer",
//     },
//   });
//   const Karachi = await db.CityModel.findOne({
//     where: {
//       name: "Karachi",
//     },
//   });
//   const Employees = [
//     {
//       _id: "44b07aaa-1910-4a0d-a5c3-7823381cc259",
//       Name: "Rafay",
//       Email: "younggdev5@gmail.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111111",
//       IdentityNumber: 3424233423,
//       DOB: "2002-01-02",
//       DateOfJoining: "2020-05-01",
//       MartialStatus: SingleMartial._id,
//       Designation: BackendDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "5c91e2bb-3c27-42b9-aaf2-fd3859a7561a",
//       Name: "Jane Smith",
//       Email: "employee2@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111112",
//       IdentityNumber: 3424233424,
//       DOB: "2002-01-03",
//       DateOfJoining: "2020-05-02",
//       MartialStatus: SingleMartial._id,
//       Designation: FrontendDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "a7d67b9c-4a6b-42cb-8be6-df8905f7f6a2",
//       Name: "Robert Brown",
//       Email: "employee3@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111113",
//       IdentityNumber: 3424233425,
//       DOB: "2002-01-04",
//       DateOfJoining: "2020-05-03",
//       MartialStatus: SingleMartial._id,
//       Designation: ProjectManager._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "d59b299f-7d2d-4f17-9a17-c3d5d6c1f4f9",
//       Name: "Emily Davis",
//       Email: "employee4@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111114",
//       IdentityNumber: 3424233426,
//       DOB: "2002-01-05",
//       DateOfJoining: "2020-05-04",
//       MartialStatus: SingleMartial._id,
//       Designation: DevOps._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "c6818e4b-408f-4314-97a1-4028b521b56b",
//       Name: "Michael Johnson",
//       Email: "employee5@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111115",
//       IdentityNumber: 3424233427,
//       DOB: "2002-01-06",
//       DateOfJoining: "2020-05-05",
//       MartialStatus: SingleMartial._id,
//       Designation: BusinessAnalyst._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "e815b8c4-6010-4b2c-b708-47e9a15d9b5b",
//       Name: "Sarah Miller",
//       Email: "employee6@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111116",
//       IdentityNumber: 3424233428,
//       DOB: "2002-01-07",
//       DateOfJoining: "2020-05-06",
//       MartialStatus: SingleMartial._id,
//       Designation: AppDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "f1a9c89b-3d0f-4e41-b8d6-6b2f4e4c1a45",
//       Name: "David Wilson",
//       Email: "employee7@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111117",
//       IdentityNumber: 3424233429,
//       DOB: "2002-01-08",
//       DateOfJoining: "2020-05-07",
//       MartialStatus: SingleMartial._id,
//       Designation: FrontendDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "b8a39a7b-bff6-4d7b-861e-4998ad6f2f7b",
//       Name: "Laura Anderson",
//       Email: "employee8@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111118",
//       IdentityNumber: 3424233430,
//       DOB: "2002-01-09",
//       DateOfJoining: "2020-05-08",
//       MartialStatus: SingleMartial._id,
//       Designation: QA._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "c9a1db9d-6c8d-4c5a-9344-7032f795de47",
//       Name: "James Thomas",
//       Email: "employee9@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111119",
//       IdentityNumber: 3424233431,
//       DOB: "2002-01-10",
//       DateOfJoining: "2020-05-09",
//       MartialStatus: SingleMartial._id,
//       Designation: QA._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "d4bc4b55-7d5c-4c3e-8e1b-829d4f749d55",
//       Name: "Mary Martinez",
//       Email: "employee10@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111120",
//       IdentityNumber: 3424233432,
//       DOB: "2002-01-11",
//       DateOfJoining: "2020-05-10",
//       MartialStatus: SingleMartial._id,
//       Designation: QA._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "e5d9429e-2c3d-4f0b-a92f-e4e06460f8ff",
//       Name: "Christopher Harris",
//       Email: "employee11@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111121",
//       IdentityNumber: 3424233433,
//       DOB: "2002-01-12",
//       DateOfJoining: "2020-05-11",
//       MartialStatus: SingleMartial._id,
//       Designation: DevOps._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "f7fddca9-d509-4e6c-9008-3be5c2a1e6f1",
//       Name: "Patricia Clark",
//       Email: "employee12@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111122",
//       IdentityNumber: 3424233434,
//       DOB: "2002-01-13",
//       DateOfJoining: "2020-05-12",
//       MartialStatus: SingleMartial._id,
//       Designation: DevOps._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "b8eb4f3e-9d7f-4e2a-875d-f7d8c9ab8d55",
//       Name: "Linda Lewis",
//       Email: "employee13@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111123",
//       IdentityNumber: 3424233435,
//       DOB: "2002-01-14",
//       DateOfJoining: "2020-05-13",
//       MartialStatus: SingleMartial._id,
//       Designation: BackendDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "c4dc2b70-845a-4c95-9cf8-d3c38ffb8979",
//       Name: "Barbara King",
//       Email: "employee14@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111124",
//       IdentityNumber: 3424233436,
//       DOB: "2002-01-15",
//       DateOfJoining: "2020-05-14",
//       MartialStatus: SingleMartial._id,
//       Designation: BackendDeveloper._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//     {
//       _id: "f4ea1d92-d1d1-48d6-bb4e-9296bc183920",
//       Name: "Susan Walker",
//       Email: "employee15@company.com",
//       Password: await bcrypt.hash("abc.123", 10),
//       Image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKgUUpHpc-JwcJiRLScAepL-T3oeaxR8T5A&s",
//       CompanyId: CompanyData._id,
//       Mobile: "0111111125",
//       IdentityNumber: 3424233437,
//       DOB: "2002-01-16",
//       DateOfJoining: "2020-05-15",
//       MartialStatus: SingleMartial._id,
//       Designation: UIUX._id,
//       City: Karachi._id,
//       Address: "Near Szabist",
//       PermanentAddress: "Near Szabist",
//       ZipCode: 2345,
//       Ceo: CeoData._id,
//     },
//   ];
//   const BulkEmployee = await db.EmployeeModel.bulkCreate(Employees);
// }
InsertCountryData();
