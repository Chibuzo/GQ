/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
//	testApi: function(req, res) {
//		console.log('Aye!');
//        var request = require('request');
//        var qs = require('querystring');
//        var body = {
//            "request": {
//                "authentication": {
//                    "password": "1p2r9o6d4u5t1c",
//                    "partnerid": "1296451"
//                },
//                "method": {
//                    "name": "GetTestList"
//                }
//            }
//        };
//
//        var option = {
//            url: "https://assessments.getqualified.work/webservices/",
//            method: "POST",
//			headers: {
//				'Content-Type': 'application/json'
//			},
//            form: qs.stringify(body)
//        };
//        request(option, function(err, response, body) {
//            console.log(err);
//            //console.log('Response: ' + JSON.stringify(response));
//            console.log('Body: ' + JSON.stringify(body));
//        });
//    },

	getTestListByCategory: function(req, res) {
		CBTTest.find({ category: req.param('category_id') }).sort('test_name asc').exec(function(err, tests) {
			return res.json(200, { status: 'success', testlist: tests });
		});
	},

    saveTest: function(req, res) {
        var data = { "records":
         [
                {
                    "test_id": 10169,
                    "test_name": "Productive People Sales Aptitude Test",
                    "coverage": "",
                    "total_questions": 90,
                    "duration": 75,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10202,
                    "test_name": "GetQualified Graduate Python Test",
                    "coverage": "",
                    "total_questions": 142,
                    "duration": 110,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10154,
                    "test_name": "Productive People Business Analyst Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10155,
                    "test_name": "Productive People Quality Assurance Associate Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10160,
                    "test_name": "Productive People Information Security Officer Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10153,
                    "test_name": "Productive People Software Engineer Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10152,
                    "test_name": "Productive People Software Engineer- Front End Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10148,
                    "test_name": "Productive People Business Intelligence Consultant Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10147,
                    "test_name": "Productive People Database Administrator Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10149,
                    "test_name": "Productive People Project Manager Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10146,
                    "test_name": "Productive People Enterprise Architect Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10145,
                    "test_name": "Productive People UI Developer Test",
                    "coverage": "",
                    "total_questions": 110,
                    "duration": 90,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10244,
                    "test_name": "Electrical Engineering and Automation Skills Test",
                    "coverage": "Electrical Engineering and Automation Skills",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7682,
                    "test_name": "Electrical Engineering Skills Test",
                    "coverage": "Electrical Engineering ;Electrical and Electronic measurements ;Electric Circuits and Fields ;Analog and Digital Electronics ;Electrical Machines ;Power Systems ;Signals and Control Systems",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6374,
                    "test_name": "Electrical Engineering Awareness and Terminology Certification",
                    "coverage": "Electrical Engineering",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Engineering Careers"
                },
                {
                    "test_id": 9462,
                    "test_name": "Energy Engineering Test",
                    "coverage": "Miscellaneous ;Power Electronics ;Thermodynamics ;Heat & Mass Transfer ;Refrigeration & Air Conditioning ;Fluid Mechanics & Hydraulics ;Power Generation & Systems Planning ;Sewage Treatment & Municipal Solid Waste",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 8027,
                    "test_name": "ExpertRating Aptitude Test",
                    "coverage": "Quantitative Aptitude ;Reasoning Ability ;Verbal Ability",
                    "total_questions": 59,
                    "duration": 59,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 9167,
                    "test_name": "Java 8 Programming Skills Test",
                    "coverage": "Exception Handling ;Java 8 Fundamentals ;Control Statements and Operators ;Streams, Tools and APIs ;Lambda Expressions ;Classes, Objects and Interfaces ;Threads and Assertions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 209,
                    "test_name": "PHP5 Test",
                    "coverage": "Forms ;Fundamentals ;Variables and Datatypes ;Advanced Concepts ;New Concepts in PHP5 ;Operators and Functions ;Language Syntax",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 6840,
                    "test_name": "ASP.Net 3.5 using C# Test",
                    "coverage": ".NET Framework: General ;Administration and Configuration ;ASP.Net Controls ;ASP.Net General Development ;Language: General ;.NET Framework: New Features ;AJAX ;Language: New Features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 48,
                    "test_name": "English Language (Words and Phrases) Test",
                    "coverage": "English Usage (Words and Phrases)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 8500,
                    "test_name": "Python 3.4 Skills Test",
                    "coverage": "Data Structures ;Object Oriented Concepts ;Control Statements, Built-in Types and Operators ;Introduction and Basics of Python 3.4 ;Functions and Modules ;Errors and Exceptions ;Standard Library and Dictionaries ;Database and Networking ;Multithreading, CGI programming and File handling ;XML services and More on programming",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 8977,
                    "test_name": "Extroversion Personality Test",
                    "coverage": "Sociability ;Gregariousness ;Friendliness ;Poise",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 6831,
                    "test_name": "English To Spanish Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Adjectives ;Syntax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 9885,
                    "test_name": "Hybrid App development Test (Intermediate)",
                    "coverage": "CSS3 with SASS and LESS ;Jquery Mobile ;Bootstrap, Kendo UI and Sencha Touch ;Angular JS and Node JS Fundamentals ;Backbone JS and Code Quality Tools ;jQuery Mobile with PhoneGap",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7847,
                    "test_name": "Adobe Photoshop CS5 Extended Test (Mac Version)",
                    "coverage": "Filters ;Working with Text ;Special Effects ;Working with Colors ;Photoshop Basics ;Working with Selection ;Working with Images ;Working with Layers ;Masking",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7009,
                    "test_name": "JavaScript 1.8 Test",
                    "coverage": "JavaScript Basics ;Regular Expressions ;Advanced Topics ;Javascript Built-in Objects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 7982,
                    "test_name": "Illustrator CC Skills Test",
                    "coverage": "Drawing ;Reshaping Objects ;Special Effects ;Illustrator Basics ;Perspective Grid ;Advance features ;Web Graphics & Symbols",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6917,
                    "test_name": "Internet Marketing Test",
                    "coverage": "Strategy & Goals ;Budgeting ;Public Relations ;Affiliate Marketing ;Pay Per Click ;Email Marketing ;Search Engine Optimization ;Podcasts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6916,
                    "test_name": "Social Media Marketing Test",
                    "coverage": "Terminology ;Social Network Marketing vs. Traditional Marketing ;Creating a Social Network Marketing Plan ;General Social Media Marketing ;Marketing Techniques for Blogging ;Marketing Techniques for YouTube ;Marketing Techniques for Twitter ;Marketing Techniques for Facebook ;Marketing Techniques for LinkedIn ;Evaluating Your Marketing Effectiveness ;Creating Marketing Campaigns",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 10562,
                    "test_name": "Adobe Illustrator CC 2017 Skills Test",
                    "coverage": "Working With Objects ;Drawing and Workspace ;Illustrator Shortcut Keys ;Illustrator Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 10590,
                    "test_name": "Adobe Photoshop CC 2017.1.1 Skills Test",
                    "coverage": "Keyboard Shortcuts ;Texts ;Tools and Techniques ;Effects and Features ;Fundamentals and Workspace Basics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7806,
                    "test_name": "Adobe Indesign CS6 Test",
                    "coverage": "Publishing ;Animation ;Typography ;Workspace ;Styles ;Indesign Basics ;Drawing and frames ;Automation and Accessibility",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 1,
                    "test_name": "HTML 4.01 Test",
                    "coverage": "Advanced Tags ;Fundamentals ;Tags ;Tables ;Links and Images ;Forms and Frames",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 2,
                    "test_name": "JavaScript 1.3 Test",
                    "coverage": "Events ;Cookies ;Form Handling ;Advanced Techniques ;JavaScript Syntax ;Document Object Model ;Built-in Objects ;JavaScript Basics ;Strings ;Javascript Operators",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6,
                    "test_name": "Perl 5 Test",
                    "coverage": "Fundamentals ;Operators ;Scalar Data ;References ;Conditional Statements ;Loops ;Input/Output ;Printing and Formatting ;Directories and I/O ;Functions and Expressions ;String Manipulation ;Arrays and Hashes",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7,
                    "test_name": "ASP 3.0 Test",
                    "coverage": "Basic Concepts ;Data Access ;Functions ;VBScript ;ASP Objects ;Debugging ;Scripting ;Cookies ;Form Handling ;Response Object ;Request Object ;Sessions ;Optimization ;Advanced Techniques",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 14,
                    "test_name": "Java Test",
                    "coverage": "Threads ;Inheritance ;Classes ;Core Fundamentals ;Applets ;IO ;Network ;Object Orientation Concepts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 15,
                    "test_name": "Advanced Java Test",
                    "coverage": "Architecture ;OOPS  ;JDBC ;RMI ;Advanced Features  ;Servlets ;Java Policies ;Concepts ;Java Beans ;Java Core ;JSP",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 18,
                    "test_name": "JSP 2.0 Test",
                    "coverage": "Servlets ;JSP Programming ;JSP Advanced Concepts ;JSP Concepts ;JSP Objects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 19,
                    "test_name": "Oracle 8 DBA Test",
                    "coverage": "Backup ;Tuning ;Architecture ;Utilities ;Networking ;Options ;Commands ;Concepts ;Storage ;Security ;Data Dictionary ;Packages",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 20,
                    "test_name": "Data Modeling Test",
                    "coverage": "Data Modeling Concepts ;DBMS Concepts ;System Development life Cycle",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 22,
                    "test_name": "System Analysis Test",
                    "coverage": "Concepts and Terminology ;Data Flow Diagrams ;Data Dictionary ;Analysis Tools ;Systems Design",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 23,
                    "test_name": "Data Warehousing Test",
                    "coverage": "Data Mining ;OLAP ;Concepts ;Databases",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 24,
                    "test_name": "SQL Test",
                    "coverage": "SQL Concepts ;Constraints ;RDBMS Concepts ;SQL Operators ;Data Retrieval ;DDL ;SQL Functions ;Sub Queries ;DML",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 26,
                    "test_name": "Linux Test",
                    "coverage": "Basic Concepts ;Networking and Security ;Commands ;Utilities",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 27,
                    "test_name": "Unix Test",
                    "coverage": "Basic Concepts and Administration ;Filters ;Commands ;Filters and Shells ;File Commands",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 28,
                    "test_name": "Windows NT Test",
                    "coverage": "Installation ;Administration ;Fault Tolerance ;File Systems ;Concepts ;Integration ;Performance Monitoring ;Troubleshooting ;Printing ;Performance Optimization ;Performance",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 29,
                    "test_name": "Unix Shell Script Test",
                    "coverage": "Concepts, variables, operators ;Decision control instructions ;Loop control instructions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 30,
                    "test_name": "Data Structures Test",
                    "coverage": "Fundamentals ;Graphs ;Hashing ;Heaps ;Trees ;Linked List ;Searching and Sorting ;Stacks and Queues ;Sparse Matrix ;Algorithm Analysis",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 31,
                    "test_name": "COM Test",
                    "coverage": "Basic Concepts ;Interfaces ;Methods ;GUIDs ;MultiThreading, ActiveX etc ;DCOM and Marshalling Code",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 32,
                    "test_name": "Visual Studio Test",
                    "coverage": "Visual Basic ;VBScript ;VC++ ;Visual Interdev",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 41,
                    "test_name": "Developer 2000 Test",
                    "coverage": "Triggers ;Windows, canvases, controls ;Application techniques ;Built-ins, system variables",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 34,
                    "test_name": "Visual Basic Test",
                    "coverage": "Data Access ;Creating ActiveX Controls ;Controls and Events ;File Handling & File System Controls ;Common Dialog Control ;Properties, Controls & Objects ;Programming Building Blocks ;Graphics ;Customizing A Form ;Visual Basic Enviroment ;Communicating With Other Windows Application ;Controlling Program Flow & Displaying Information ;MDI & SDI Applications ;ActiveX Documents ;Creating And Using Class Modules ;Building Menus ;Arrays And Control Structures ;Objects & Methods ;Functions & Class Modules ;Data Controls And Bound Controls",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 35,
                    "test_name": "CISCO Test",
                    "coverage": "WAN Technologies ;Routing ;Networking Fundamentals ;Operating Cisco Devices ;Network Security ;LAN Switching & VLANs ;TCP/IP, Subnetting & VLSM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 36,
                    "test_name": "TCP/IP Test",
                    "coverage": "Fundamentals ;Subnet Addressing ;IP Routing ;IP Address Resolution ;DHCP ;Host Name Resolution  ; IP Addressing ;Installing and Configuring ;Internetworking and Connectivity ;Subnetting",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 37,
                    "test_name": "Networking with Windows NT 4 Test",
                    "coverage": "Installation ;Administration ;Fault Tolerance ;File Systems ;Concepts ;Integration ;Performance Monitoring ;Troubleshooting ;Printing ;Performance Optimization",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 38,
                    "test_name": "Power Builder Test",
                    "coverage": "Connecting to the database ;PFC ;Techniques, controls, objects ;Functions and powerscript",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 39,
                    "test_name": "Programming with C Test",
                    "coverage": "Fundamentals ;File Handling ;Pointers ;Arrays ;Variables and Operators ;Preprocessors ;Functions and Structures ;Command Line Arguments ;Standard Libraries",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 42,
                    "test_name": "Visual Basic 6 Test",
                    "coverage": "Data Access ;Creating ActiveX Controls ;Error Handling ;Controls and Events ;File Handling & File System Controls ;Common Dialog Control ;Properties, Controls & Objects ;Programming Building Blocks ;Graphics ;Customizing A Form ;Visual Basic Enviroment ;Communicating With Other Windows Application ;Controlling Program Flow & Displaying Information ;MDI & SDI Applications ;ActiveX Documents ;Building Menus ;Arrays And Control Structures ;Objects & Methods ;Functions & Class Modules ;Data Controls And Bound Controls",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 43,
                    "test_name": "Ecommerce Test",
                    "coverage": "Concepts ;SSL ;SET ;Digital IDs ;HTTPS ;EDI ;Security ;Smart Cards ;Advertising ;ECommerce Facilitators and Services",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 46,
                    "test_name": "Adobe Photoshop 5.5 Test",
                    "coverage": "Fundamentals ;Commands ;Designing Web Images ;Tools ;Layers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 47,
                    "test_name": "Networking Concepts Test",
                    "coverage": "OSI Model ;Network Cards, Cabling and Connectors ;Topologies & Protocols ;Ethernet & WAN Technologies ;IEEE Standards & TCP/IP ;Concepts & Terminology",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 50,
                    "test_name": "U.S. English Basic Skills Test",
                    "coverage": "Punctuation ;Sentence Structure ;Pronouns ;Indirect Speech ;ARTICLES AND CONJUNCTIONS ;PREPOSITIONAL PHRASES ;ADJECTIVES AND ADVERBS ;VERBS AND VERB TENSES ;WORD ORDER",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 51,
                    "test_name": "XML 1.0 Test",
                    "coverage": "Concepts ;XML Syntax ;DTDs ;Namespaces ;XHTML ;XML Schemas ;XLink ;XSL ;XPath ;XML DOM ;XML Data Types",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 52,
                    "test_name": "Adobe Photoshop 6.0",
                    "coverage": "Fundamentals ;Commands ;Designing Web Images ;Tools ;Layers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 53,
                    "test_name": "Marketing Management Test",
                    "coverage": "Marketing Concepts ;Marketing Environment ;Marketing Strategy ;Marketing Management ;Marketing Mix ;Marketing Function ;Marketing Communications ;Sales Methods",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 69,
                    "test_name": "English Speaking Test",
                    "coverage": "English Pronunciation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 70,
                    "test_name": "Windows 95/98 Test",
                    "coverage": "Advanced Features  ;Windows Basics ;Windows Accessories ;Files and Folders ;Windows In-built Features ;Control Panel",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 71,
                    "test_name": "Microsoft Word 2000 Test",
                    "coverage": "Word 2000 Fundamentals ;Formatting paragraphs using Word 2000 ;Formatting characters using Word 2000 ;Automation and Built-in Features ;Printing options in Word 2000 ;Working with graphics in Word 2000 ;Working with Tables and Frames",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 72,
                    "test_name": "DOS Test",
                    "coverage": "Basics of DOS ;AUTOEXEC.BAT ;CONFIG.SYS ;DOS Commands ",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 73,
                    "test_name": "Computer Skills Test",
                    "coverage": "Computer Software ;Internet ;Windows ;Keyboard usage ;Computer Settings ;Emailing ;Computer Hardware and Networking",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 91,
                    "test_name": "PHP4 Test",
                    "coverage": "Operators ;Functions ;Arrays ;Debugging ;Sessions ;Classes ;Variables and Datatypes ;Include Files ;Regular Expressions ;Files ;Strings ;Control Statements ;Mail",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 93,
                    "test_name": "Microsoft Access 2000 Test",
                    "coverage": "SQL Concepts ;Access 2000 Security  ;Databases and Tables  ;Access 2000 Reports  ;Access Database ;Access 2000 Forms and Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 94,
                    "test_name": "MySQL 5.0 Test",
                    "coverage": "Operators ;Data/Column Types ;General ;Advanced Concepts ;Database Commands ;Data Retrieval ;Data Types ;SQL",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 98,
                    "test_name": "Macromedia Flash 5 Test",
                    "coverage": "Layers ;General ;Sound Clips ;Frames ;Action Scripting ;Smart Clips ;Publishing Movies on the Web ;Tweening in Flash ;Working in&nbsp;&nbsp;Flash environment",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 101,
                    "test_name": "MS SQL Server 2000 Test",
                    "coverage": "Functions ;Variables and Datatypes ;General ;Database Commands ;Programming Constructs ;Data Retrieval",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 109,
                    "test_name": "Networking with Windows 2000 Test",
                    "coverage": "Windows 2000 Networking Architecture ;Managing Storage Resources ;Managing NTFS Permissions ;Sharing Drives and Printers ;Monitoring the Server ;Managing Active Directory Objects ;Using Group Policies",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 110,
                    "test_name": "Advanced Networking with Windows 2000 Test",
                    "coverage": "Managing Storage Resources ;Managing NTFS Permissions ;Managing Active Directory Objects ;TCP/IP, DHCP and WINS ;DNS ;Managing IIS ;Remote Client Access ;Disaster Recovery and Prevention ;Managing Client Server Computers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 111,
                    "test_name": "Programming with C# Test",
                    "coverage": "Flow Control ;Exception Handling ;Basic Concepts ;Operators ;Object Oriented Concepts ;Operator Overloading ;Classes ;Advanced Concepts ;CLR ;ADO.net ;Framework Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 112,
                    "test_name": "Computer Technician Test",
                    "coverage": "Processors and Motherboard Components ;ASCII and Interrupts ;Ports and Expansion Slots ;IDE, SCSI and Buses ;Computer Hardware Concepts and Repair ;Memory and Storage Devices ;Hard Disks and Floppy Disks ;Printers and Display Cards ;BIOS and Power Supplies",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Hardware"
                },
                {
                    "test_id": 133,
                    "test_name": "Microsoft Word 2000 Test",
                    "coverage": "Word 2000 Fundamentals ;Formatting paragraphs using Word 2000 ;Formatting characters using Word 2000 ;Automation and Built-in Features ;Printing options in Word 2000 ;Working with graphics in Word 2000 ;Working with Tables and Frames",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 139,
                    "test_name": "Medical Transcription Skills (Medical Procedures)",
                    "coverage": "Medical Procedures ;Medical Tests",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 140,
                    "test_name": "Medical Transcription Skills (Medical Abbreviations and Symbols)",
                    "coverage": "Medical Abbreviations ;Medical Symbols",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 141,
                    "test_name": "Medical Transcription Skills (Diseases and Conditions)",
                    "coverage": "Dermatology ;Ear, Nose and Throat ;Pulmonology ;Ophthalmology ;Urology ;Cardiology ;Gastroenterology ;Orthopedics ;Neurology",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 142,
                    "test_name": "Medical Transcription Skills (Human Body Fundamentals)",
                    "coverage": "Dermatology ;Ear, Nose and Throat ;Ophthalmology ;Gastroenterology ;Orthopedics ;Neurology ;Pulmonary and Cardiac ;General Human Body",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 143,
                    "test_name": "Medical Transcription Skills (Transcribing Medical Words) - (with audio)",
                    "coverage": "Medical Terms (Listening)",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 145,
                    "test_name": "Medical Transcription Skills (General Medicines)",
                    "coverage": "Common Medicines",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Medical Transcription and Medical Billing"
                },
                {
                    "test_id": 148,
                    "test_name": "Computer Skills Test",
                    "coverage": "Computer Software ;Internet ;Windows ;Keyboard usage ;Computer Settings ;Emailing ;Computer Hardware and Networking",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 149,
                    "test_name": "ASP.Net Test",
                    "coverage": "Basic Concepts ;Security ;Memory Management ;Event Handling ;CLR ;Configuration ;Advanced Topics ;Database Programming and Validation ;ADO.net ;DataBinding, Web Controls, User Control, Custom Controls ;Framework Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 150,
                    "test_name": "ASP.NET 2003 Test",
                    "coverage": "Basic Concepts ;Security ;Memory Management ;Event Handling ;CLR ;Configuration ;Advanced Topics ;Database Programming and Validation ;ADO.net ;DataBinding, Web Controls, User Control, Custom Controls ;Framework Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 152,
                    "test_name": "Microsoft Excel 2000 Test",
                    "coverage": "Excel Fundamentals ;Formatting Excel Worksheets ;Entering Data into Worksheets ;Formulas and Calculations using Excel  ;Excel Built-in Features",
                    "total_questions": 30,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 153,
                    "test_name": "MS Excel 2000 Test",
                    "coverage": "Excel Fundamentals ;Formatting Excel Worksheets ;Entering Data into Worksheets ;Formulas and Calculations using Excel  ;Excel Built-in Features",
                    "total_questions": 30,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 154,
                    "test_name": "Microsoft PowerPoint 2000 Test",
                    "coverage": "PowerPoint Fundamentals ;PowerPoint Graphical Features ;Formatting PowerPoint Presentations ;PowerPoint Built-in Features",
                    "total_questions": 20,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 155,
                    "test_name": "MS PowerPoint 2000 Test",
                    "coverage": "PowerPoint Fundamentals ;PowerPoint Graphical Features ;Formatting PowerPoint Presentations ;PowerPoint Built-in Features",
                    "total_questions": 20,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 157,
                    "test_name": "Delphi 6 Test",
                    "coverage": "Common Component Use in Delphi ;Object Pascal Language ;Delphi and Databases ;Delphi IDE and Component Use ;General Delphi",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 164,
                    "test_name": "FrontPage 2000 Test",
                    "coverage": "FrontPage 2000 Fundamentals ;Frontpage 2000 Advanced Features ;Designing Web Pages ;Analysing Webs using FrontPage 2000 ;Ensuring Web Compatibility ;HTML and CSS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 171,
                    "test_name": "Windows XP Test",
                    "coverage": "Windows Basics ;Windows Accessories ;Files and Folders ;New Features in Windows XP",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 173,
                    "test_name": "Call Center Skills Test",
                    "coverage": "Spellings ;Computer Skills ;Sentence Structure ;Email Etiquette and Skills ;Telephone Etiquette and Skills ;Analytical and Logical Ability ;Helpdesk Etiquette and Skills ;Outbound Sales Skills",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 174,
                    "test_name": "Human Body Fundamentals Test",
                    "coverage": "Dermatology ;Ear, Nose and Throat ;Ophthalmology ;Gastroenterology ;Orthopedics ;Neurology ;Pulmonary and Cardiac ;General Human Body",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Healthcare"
                },
                {
                    "test_id": 175,
                    "test_name": "General Medicines Test",
                    "coverage": "Common Medicines",
                    "total_questions": 40,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Healthcare"
                },
                {
                    "test_id": 177,
                    "test_name": "Paramedic Skills Test",
                    "coverage": "Common Medicines ;Handling Wounded Patients ;Revival Techniques ;Handling Emergency Situations ;Paramedic Procedures ;The Human Body",
                    "total_questions": 35,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Healthcare"
                },
                {
                    "test_id": 191,
                    "test_name": "Microsoft Word 2003 Test",
                    "coverage": "Automation and Built-in Features ;Working with Tables and Frames ;Word 2003 Fundamentals ;Formatting Characters using Word 2003 ;Formatting Paragraphs using Word 2003 ;Printing Options in Word 2003 ;Working with Graphics in Word 2003",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 192,
                    "test_name": "Microsoft Excel 2003 Test",
                    "coverage": "Excel Fundamentals ;Formatting Excel Worksheets ;Entering Data into Worksheets ;Formulas and Calculations using Excel  ;Excel Built-in Features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 195,
                    "test_name": "CSS 2.0 Test",
                    "coverage": "Fundamentals ;Advanced Techniques ;Selectors ;Basic Styles ;Text and Font Styles ;Page Media",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 197,
                    "test_name": "Dot Net Fundamentals Test",
                    "coverage": "Fundamentals ;CLR ;Deployment ;Assembly ;Remoting ;GC ;Application Domain ;CTS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 198,
                    "test_name": "VB.NET 2003 Test",
                    "coverage": "Forms ;Fundamentals ;OOPS  ;Collections ;Advanced Techniques ;Database Connectivity ;Assembly ;Framework Basics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 199,
                    "test_name": "ASP.NET with SQL Server Test",
                    "coverage": "Memory Management ;Event Handling ;CLR ;SQL Server Variables and Datatypes ;SQL Server Fundamentals ;SQL Server Programming Constructs ;ASP.NET Basics ;ASP.NET Events ;ASP.NET Custom Controls ;ASP.NET Security ;ASP.NET Configuration ;Advanced ASP.NET Concepts ;Advanced Topics ;Database Programming and Validation ;ADO.net ;DataBinding, Web Controls, User Control, Custom Controls ;SQL Server Queries",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 200,
                    "test_name": "GSM Test",
                    "coverage": "Fundamentals ;GSM Services ;GSM Architecture ;Radio Linking ;Speech Coding",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 201,
                    "test_name": "GPRS Test",
                    "coverage": "Fundamental Concepts ;GPRS Services ;GPRS Speed ;GPRS Profiles",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 202,
                    "test_name": "ADO.NET 2003 Test",
                    "coverage": "Fundamentals ;Performance ;Data Set ;Advanced Topics ;Data Table ;Data Reader ;Data View ;ADO.NET Fundamentals ;Data Adapter ;Command Object",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 203,
                    "test_name": "JSharp 2003 Test",
                    "coverage": "Fundamentals ;OOPS  ;Advanced Techniques ;Language Basics",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 204,
                    "test_name": "OOPS Concepts Test",
                    "coverage": "Fundamental Concepts ;Functions and Variables ;Advanced OOPS Concepts ;Inheritance and Abstraction",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 208,
                    "test_name": "ERP Test",
                    "coverage": "Fundamentals ;Advantages and Disadvantages ;Implementation ;Modules ;Software Selection ;Information Technology Infrastructure",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 210,
                    "test_name": "DHTML Test",
                    "coverage": "JavaScript Syntax ;CSS ;Javascript ;DHTML Tricks ;Javascript Events ;CSS Filters ;DHTML DOM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 217,
                    "test_name": "CDMA Test",
                    "coverage": "Fundamentals of CDMA ;CdmaOne ;CDMA2000 ;Technical Details of CDMA",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 220,
                    "test_name": "3GSM Test",
                    "coverage": "GSM Architecture ;Fundamental Concepts ;UMTS ;Features ;W-CDMA",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 222,
                    "test_name": "Oracle 9i Administration Test",
                    "coverage": "Data Dictionary ;Oracle Architecture ;Constraints ;Oracle Instance ;Segments ;Oracle Enterprise Manager ;Creating Database ;Managing Users ;Background Process ;Logical Storage ;Indexes ;Redo logs ;Strorage Structure and Relationships ;Extents ;Managing Data ;Multiplexing files ;Controling Parameter ;Starting Database ;Tablespace ;Managing Database ;Managing Resource ;Parameter File ;Starting Oracle Database ;Resizeing Redo log files ;Managing Undo Segment ;Control files ;Managing Password file",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 229,
                    "test_name": "EDGE Test",
                    "coverage": "EDGE Fundamentals ;Keying ;Architecture of EDGE ;Advanced EDGE Concepts",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 232,
                    "test_name": "Basic Electronics Test",
                    "coverage": "Basic Electronics ;Circuit Design ;Radio Communication ;Semiconductors and Amplifiers",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 233,
                    "test_name": "Oracle SQL 9i Test",
                    "coverage": "Data Dictionary ;Constraints ;Creating Tables ;SQL*PLUS ;SQL Functions ;Joins ;NULL Values ;SQL Data types ;Group Functions ;SQL Operators ;Sql9i ;Inline Views ;Data Retrieval ;Data Manipulation ;Sub Queries ;Restricting Data ;Transactions ;DDL",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 234,
                    "test_name": "Oracle PL/SQL 9i Test",
                    "coverage": "Packages ;Pl/Sql Variable Declaration ;Scope Rule ;Data Types ;Trigger ;Function ;Cursors ;PL/SQL Declarations ;Procedure ;Named Blocks ;LOBs ;Control Statement ;PL/SQL Security ;Fetching Data ;Packges ;Exception",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 238,
                    "test_name": "Oracle Forms 9i Test",
                    "coverage": "Forms Developer Environment ;Non Input Items ;Menus ;Record Group ;Lovs & Editor ;Multiple Form Application ;Sharing Object and code ;Content Canvas ;Form Developer Environment ;Sharing Objects and Codes ;Alerts ;Sharing object and codes ;Working Canvas and Windows ;Record Groups ;Sharing objects and code ;Lovs ;Flexible Code ;Creating Noninput Items ;Debugging Triggers ;Noninput Items ;Validation ;Transaction Processing ;Data Sources ;Data Blocks and Frames ;Messages and Alerts ;Canvas and Windows ;Additional Input Items ;Text Items ;Other Canvas Types",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 239,
                    "test_name": "Oracle 10g Test",
                    "coverage": "Oracle Architecture ;Indexes ;Tablespace ;Automatic Storage Management ;Instance Configuration ;Querying Database ;Flash Recovery Area ;Backups and Redo logs ;Managing and Tuning Database",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 241,
                    "test_name": "Amplifiers And Filters Test",
                    "coverage": "Filters ;Audio Amplifier ;Operational Amplifier",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 242,
                    "test_name": "Circuit Design Test",
                    "coverage": "Amplifier ;Oscillators ;Resistance Capacitance Inductance",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 244,
                    "test_name": "ColdFusion MX 7",
                    "coverage": "Fundamentals ;Functions and Expressions ;CFML ;Variables and Expressions ;Arrays and Structures ;Elements and Functions ;Forms and Database Operations",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 268,
                    "test_name": "ColdFusion MX 7 Test",
                    "coverage": "Fundamentals ;CFML ;Arrays and Structures ;Elements and Functions ;Forms and Database Operations ;Variables, Functions and Expressions",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 284,
                    "test_name": "Software Testing Test",
                    "coverage": "Fundamental Concepts ;Types of Testing ;Advanced Testing Concepts ;Automated Testing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 287,
                    "test_name": "Analog Electronics Test",
                    "coverage": "Amplifiers ;Measuring Electronics ;Oscillators Electronics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 290,
                    "test_name": "Wireless Electronics Test",
                    "coverage": "Filters ;Transmitter ;Receiver ;Modulators",
                    "total_questions": 40,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 422,
                    "test_name": "Microsoft Access 2003 Test",
                    "coverage": "Administration ;SQL Concepts ;Databases and Tables  ;Access 2003 Security ;Access 2003 Reports ;Access 2003 Features ;Modules/VBA ;Forms/Events",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 424,
                    "test_name": "Microsoft PowerPoint 2003 Test",
                    "coverage": "PowerPoint Fundamentals ;PowerPoint Graphical Features ;PowerPoint Built-in Features ;PowerPoint Formatting Features ;Custom Animation ;PowerPoint Graphical Elements",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 480,
                    "test_name": "U.S. English Chicago Style Editing Skills Test (For Writing Professionals)",
                    "coverage": "VERB AND TENSE ERRORS ;GRAMMAR AND USAGE ERRORS ;SENTENCE STRUCTURE ERRORS I: AGREEMENT & PARALLELISM ;SENTENCE STRUCTURE ERRORS II: MODIFIERS & COMPARISONS ;PUNCTUATION ERRORS ;DICTION ERRORS ;STYLE ERRORS ;SPECIAL EDITING ISSUES",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 507,
                    "test_name": "AJAX Test",
                    "coverage": "Architecture ;General ;Javascript ;XMLHttpRequest Object",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 524,
                    "test_name": "Maya 7.0 Test",
                    "coverage": "Modeling & Tools ;Animation ;Particles ;Lighting ;Materials & Shaders ;Rendering",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 527,
                    "test_name": "3ds Max 7.0 Test",
                    "coverage": "Animation ;Particles ;Lighting ;3d Modeling ;Materials and Texturing ;Rendering and Effects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 528,
                    "test_name": "3ds Max 8.0 Test",
                    "coverage": "Animation ;Particles ;Lighting ;3d Modeling ;Materials and Texturing ;Rendering and Effects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 532,
                    "test_name": "Adobe Illustrator Test",
                    "coverage": "Filters ;User Interface ;Toolbox ;Layers and Actions ;Output and Formats ;Working With Objects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 533,
                    "test_name": "Adobe After Effects 7.0 Test",
                    "coverage": "Rendering ;Compositions ;Masking and Transparency ;Animating Layers ;Video and Audio Effects ;Managing Layers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 534,
                    "test_name": "Adobe Premiere Test",
                    "coverage": "Standards and Formats ;Audio and Video Mixing ;Clip Animation ;Editing ;Title ;Superimposing ;Transitions",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 548,
                    "test_name": "Oracle 10g Database Administration",
                    "coverage": "Oracle Architecture ;Indexes ;Redo logs ;Tablespace ;Managing Database ;Automatic Storage Management ;Instance Configuration ;Database Tuning ;Querying Database ;Managing Schedular ;Performance Tuning ;Flash Recovery Area ;Backups",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 549,
                    "test_name": "Oracle PL/Sql 10g Test",
                    "coverage": "Exception Handling ;Loops ;Data Types ;Cursors ;PL/SQL Declarations ;Named Blocks ;LOBs ;PL/SQL Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 550,
                    "test_name": "Redhat Linux 9.0 Admin Test",
                    "coverage": "Installation ;Grub ;Boot Process ;Boot ;Network ;File system ;Device Configuration ;Proc Filesystem ;RPM ;Trouble Shooting ;Users and Groups ;Crontab ;Kernel ;Printer ;RAID ;LVM ;xserver ;Quotas",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 552,
                    "test_name": "Redhat Linux 9.0 General Test",
                    "coverage": "Printing ;Regular Expressions ;General ;Linux Documentation ;Basic ;Linux Commands ;Linux Command ;Unix Shell ;Redirection ;User Groups ;User Permissions ;Vi Editor ;Symbolic Links ;Disk Tool ;Linux Process ;Linux Basics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 601,
                    "test_name": "Windows Networking Infrastructure Test",
                    "coverage": "DHCP ;WINS ;Security ;DNS ;NAT ;IPSEC ;Certificate ;RRAS ;SUS ;Routing Protocols ;IP Addressing and Protocols",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 602,
                    "test_name": "Networking XP Test",
                    "coverage": "Performance ;Networking and Installation Basics ;Share Folders and Permissions ;Managing Devices ;Protocols and IP Addressing ;Managing Disk Storage ;Encryption ;Troubleshooting Techniques ;Domain Structure in Active Directory ;Managing User Accounts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 603,
                    "test_name": "Networking Server 2003 Test",
                    "coverage": "Installation ;Troubleshooting ;Protocols ;General ;Shadow Copies ;Authentications ;IIS ;Security and Authentication ;RAID and Back-Up",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 608,
                    "test_name": "Peachtree 7 Test",
                    "coverage": "Basics ;General Ledger ;Invoicing ;Accounts Receivable ;Accounts Receivable/Invoicing ;Accounts Payable ;Payroll ;Inventory ;Fixed Assets ;Management Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 609,
                    "test_name": "Search Engine Optimization Test",
                    "coverage": "The Search Engines Industry ;Google Search Technology ;SEO Techniques ;Search Engines and Directories ;Link Popularity and Linking Strategies ;Keyword Selection and Optimization Strategies ;Working with Meta Tags",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 611,
                    "test_name": "Active Directory Test",
                    "coverage": "DNS ;Active Directory ;Active Directory Troubleshooting ;Windows Installer and RIS ;Active Directory FSMO and FSMO Roles ;Active Directory GPO",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 614,
                    "test_name": "Outbound Sales Skills Test",
                    "coverage": "Basic Outbound Sales ;Opening the Sale ;Call Control ;Closing the Sale ;Process Knowledge ;Calling Ethics",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 615,
                    "test_name": "Organizational Behavior Test",
                    "coverage": "Leadership ;Motivation ;Personality and Emotions ;Perception and Decision Making ;Conflict and Negotiations ;Organizational Structure ;Organization Culture ;Organizational Change ;Stress Management ;Power and Politics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 616,
                    "test_name": "Management Skills Test",
                    "coverage": "Concepts ;Leadership ;Personnel Management ;Management Functions ;Management Tools ;Finance ;Organizing ;Organizational Behavior",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 633,
                    "test_name": "Marketing Terminology Test",
                    "coverage": "Marketing Terminology",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 638,
                    "test_name": "Public Relations Skill Test",
                    "coverage": "Terminology ;Writing ;Management ;Research ;Spin ;Marketing and Advertising ;Ethics ;PR Online",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 972,
                    "test_name": "DB2 Admin Test",
                    "coverage": "Indexes ;Tablespace ;Other Database Objects ;Database Object ;Backup and Recovery ;Locking ;Optimizer ;Dynamic SQL ;Index",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 973,
                    "test_name": "DB2 Programming Test",
                    "coverage": "SQL Functions ;SQL Operators ;Data Retrieval ;Subquery ;Cursors ;Index ;Locks ;Package ;Data Type ;Basic Programming ;Join",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 1517,
                    "test_name": "Programming with C++ Test",
                    "coverage": "Constructors and Destructors ;Operator Overloading ;Classes ;Inheritance and Object Oriented Concepts ;Syntax and Language Fundamentals ;Miscellaneous ;Standard Template Library, Directives and Macros ;Pointers and File Handling ;Exceptions and Exception Handling ;Functions and Virtual Functions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 1768,
                    "test_name": "Dreamweaver 8 Test",
                    "coverage": "Tables in Dreamweaver ;Using Cascading Stylesheets ;Workspace & Interface ;Files & Site Management ;Templates & Layout ;Code & Page Contents ;Dynamic Pages & Sites ;Scripting and Behaviors",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 1769,
                    "test_name": "Macromedia Flash 8 Test",
                    "coverage": "Architecture and Interface ;Design and Animation ;Actionscripting ;Sound and Output",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 2367,
                    "test_name": "SOAP 1.2 Test",
                    "coverage": "SOAP Message ;Encoding Style ;SOAP Basics ;SOAP Versions ;SOAP Faults ;SOAP Data Types ;SOAP Arrays ;XML Schema",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 2369,
                    "test_name": "Java ME Test",
                    "coverage": "Basic Concepts ;Advanced Concepts ;MIDlets ;JTWI ;CDC ;CLDC ;Java ME Profiles ;Java ME Configurations",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 2400,
                    "test_name": "Python 2.x Test",
                    "coverage": "Exception Handling ;Printing ;Advanced Concepts ;Python Programming Concepts ;Object Class ;Python Basics ;Common Modules ;Python Web Programming ;Text Processing ;Namespaces and Bindings",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 2519,
                    "test_name": "Ruby on Rails Test (1.x)",
                    "coverage": "Exception Handling ;Fundamentals ;Advanced Concepts ;Caching ;Rails Helpers ;Testing ;Controller ;Ruby Programming Concepts ;Database Handling ;Testing and Validation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 3722,
                    "test_name": "Adobe Photoshop CS2 Test",
                    "coverage": "Layers ;User Interface ;Web Graphics ;Adobe Photoshop Tools & Shortcuts ;File Format ;Color Modes & Color Management ;Filters & Effects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 5450,
                    "test_name": "LAMP Test",
                    "coverage": "Linux File System ;Linux Installation ;Shell Scripts ;Linux Security ;PHP Operators and Functions ;PHP Fundamentals ;PHP Forms ;New Concepts in PHP ;MySQL Fundamentals ;SQL Queries ;MySql Indexes ;MySql Database Management ;MySql and PHP ;Apache Basics ;Website Administration Through Apache ;Advanced Concepts of Apache",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 5451,
                    "test_name": "Dot Net Nuke Test",
                    "coverage": "Fundamentals ;Installation ;ASP.NET Basics ;Advanced Topics ;Page Basics ;Modules ;Host Administration ;DNN Skinning ;HTTP Modules ;Client API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 5452,
                    "test_name": "Web Services Test",
                    "coverage": "Advanced Concepts ;.Net Web Service Basics ;XML Serialization ;.Net Web Service Client ;WSDL ;Extending .Net Web Services ;Discovering Web Services ;Securing Web Services ;SOAP ;Messaging with Web Services",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6008,
                    "test_name": "Adobe Flex Builder 2 Test",
                    "coverage": "Adobe Flex Builder Interface ;Flex Controls and Components ;Developing Applications ;Working with effects ;Action Script ;Charting Components ;Flex Data Development",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6105,
                    "test_name": "Business Writing Skills Test (U.S. Version)",
                    "coverage": "E-mail ;BASIC KNOWLEDGE ;GRAMMAR & STYLE ;RESUMES & COVER LETTERS ;MEMOS ;BUSINESS LETTERS & DOCUMENTS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6319,
                    "test_name": "Microsoft Word 2007 Test",
                    "coverage": "Word Fundamentals and Interface ;Interface Customization ;Forms and Templates ;Page Layout ;Writing and Formatting Text and Equations ;Charts ;Working with Graphics ;Security and File Handling ;Working with Tables, References, and Lists ;Keyboard Shortcuts/Viewing and Navigating",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6320,
                    "test_name": "Microsoft Access 2007 Test",
                    "coverage": "Administration ;Queries ;Tables ;Access Interface ;Access Database ;Reports ;Macros and Programmability ;Modules/VBA ;Forms/Events ;Access Features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6321,
                    "test_name": "Microsoft Excel 2007 Test",
                    "coverage": "Charts ;Working with Graphics ;File Format and Handling ;Worksheet ;Excel Tables and Functions ;Formulae ;Working with Filters and Keyboard Shortcuts ;Working with Data ;PivotTable and PivotChart Reports ;Working with Security and Macros",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6322,
                    "test_name": "Microsoft PowerPoint 2007 Test",
                    "coverage": "Charts ;Working with Graphics ;PowerPoint Interface ;Working with Files and Languages ;Animation Effects and Movies ;Working with Sounds ;Creating Presentations ;Adding Pictures, Shapes and WordArt ;Macros and Security ;Customizing and Keyboard Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6471,
                    "test_name": "Adobe Flash CS3 Test",
                    "coverage": "Flash Interface ;Using Artwork, Color and Strokes ;Drawing ;Graphics Objects and Working with Text ;Working with Screens, Symbol and Instances ;Creating Animation ;Using Special Effects and Keyboard Shortcuts ;Working with Sounds and Video ;ActionScript ;Publishing Content, Exporting and Printing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6472,
                    "test_name": "Adobe Illustrator CS3 Test",
                    "coverage": "Illustrator Interface ;Working with Artwork and Drawing ;Working with Color and Special Effects ;Painting ;Working with Objects and Layers ;Reshaping Objects ;Importing and Exporting Files ;Type ;Web Graphics ;Automating Tasks and Keyboard Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6473,
                    "test_name": "Adobe Fireworks CS3 Test",
                    "coverage": "Layers ;Fireworks Interface ;Selecting Objects and Working with Text ;Pages and Keyboard Shortcuts ;Using Symbols, Styles and URLs ;Slices ;Creating Buttons, Pop-up Menus and Animation ;Optimizing, Exporting and Using Slideshows ;Fireworks with other Applications and Automating Tasks ;Using Blending and Live Filters",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6474,
                    "test_name": "CorelDraw X3 Test",
                    "coverage": "CorelDraw Interface and Tools ;Working with Objects and Shapes ;Working with Symbols and Filling Objects ;Three Dimensional Effect ;Using Transparencies and Lenses ;Page Layout and Layers ;Working with Text ;Working with Bitmaps ;File Format and Web Enabled Objects ;Printing and Customizing Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6475,
                    "test_name": "Macromedia Director MX 2004 Test",
                    "coverage": "Director Interface and Sprites ;Working with Score, Stage and Cast ;Using Animation, Tempo and Transitions ;Bitmaps and Vector Shapes ;User Interaction and Writing Text ;Flash and its Components ;Using Sound and Digital Video ;3D Basics and Behaviors ;Using Models and Resources and MIAW ;Controlling 3D World and Packaging Movies",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6476,
                    "test_name": "Corel Paint Shop Pro XI Test",
                    "coverage": "Layers ;Workspace and Selections ;Interface ;Finding, Organizing and Adjusting Images ;Customizing Paint Shop Pro and Restoring Images ;Colors and Materials ;Effects ;Using Text, Drawing and Vector Objects ;Automating Tasks and Web Basics ;Using Masks and Keyboard Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6477,
                    "test_name": "Corel Ventura 10 Test",
                    "coverage": "Publications ;Corel Ventura Interface & Library Files ;Text Files ;Formatting Paragraphs ;Using Frames and Graphic Objects ;Bitmaps and Effects ;Indexing Publications and Using Table ;Page Layout, Design and Numbering ;Printing and Internet Publishing ;Cross References and Scripts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6478,
                    "test_name": "PageMaker 7.0 Test",
                    "coverage": "PageMaker WorkArea ;Constructing a Publication ;Text Formatting and Word Processing ;Composition, Typography and Printing ;Graphics and Text Object ;Indexes, Contents Pagination and Using Color ;Adobe Table ;Creating PDF, HTML Files and Scripts ;Importing, Linking, Exporting and Tags ;Windows Special Characters & Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6479,
                    "test_name": "Adobe Photoshop CS3 Test",
                    "coverage": "Layers ;Type ;Automating Tasks and Keyboard Shortcuts ;Workspace ;Working with Images, Retouching and Transforming ;Color Management ;Color and Tonal Adjustments ;Using Selection and Drawing ;Filters and Saving Images ;Working With Web, Video and Animation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6480,
                    "test_name": "Quark XPress 7.0 Test",
                    "coverage": "Typography ;Layout Basics ;Working with Boxes and Text ;Manipulating Items and Using Lines ;Pictures ;Using Palettes and Layers ;Working with Color, Opacity and Tables ;Web Layouts ;Shared Content and Keyboard Shortcuts ;Job Jacket and Trapping",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6508,
                    "test_name": "Adobe FrameMaker 8 Test",
                    "coverage": "Workspace Interface & Keyboard Shortcuts (Windows) ;Tables, Cross References and Footnotes ;Variables, Equations & Conditional Text ;Graphics & Frames ;Using Color & Hypertext ;Page Layout & XML ;Indexes & Book ;Using Revision Management & WebDAV ;Importing, linking, and exporting ;Using DITA, HTML and PDF",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6509,
                    "test_name": "Macromedia FreeHand MX Test",
                    "coverage": "Type ;FreeHand Basics ;Working with Documents and Drawing ;Layers, Symbols and Styles ;Using Objects, Stroke and Fills ;Color ;Special Effects ;Imported Artworks and Keyboard Shortcuts (windows) ;Web Graphics and Animation ;Saving, Printing and Exporting",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6510,
                    "test_name": "Adobe InDesign CS3 Test",
                    "coverage": "Working with Text ;Workspace and Interface ;Using Documents, Layers & Text Variable ;Using Printing, Index and Markers ;Working With Drawing & Graphics ;Automation, Frames and Objects ;Swatches & Transparency Effects ;XML ;Using Sharing Content and Tables ;Keyboard Shortcuts (windows) & Anchored Objects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6511,
                    "test_name": "Adobe InCopy CS3 Test",
                    "coverage": "Tables ;Typography ;Workspace ;InCopy Interface ;InCopy Documents & Graphics ;Sharing Content ;Text ;Styles ;Bullets, Text composition & Keyboard Shortcuts(Windows) ;Using XML",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6512,
                    "test_name": "Dreamweaver CS3 Test",
                    "coverage": "CSS ;Workspace ;Creating and Managing Sites ;Assets and Libraries and Keyboard Shortcuts (Windows) ;Laying Out Pages With HTML and Page Code ;Adding Contents To Pages ;Linking And Previewing ;Template ;Working With XML Data & Database ;Spry Pages",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6514,
                    "test_name": "Microsoft SharePoint Designer 2007 Test",
                    "coverage": "Visual Aids & Contributor ;Customizing & Collaboration ;Site & File Management & Keyboard Shortcuts (windows) ;Master Pages & Workflows ;Data Sources & Data Views",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6515,
                    "test_name": "Microsoft Outlook 2007 Test",
                    "coverage": "Accounts and Data Files ;E-mail ;Calendar,Scheduling and Tasks ;Working With Views and Contacts ;Security, Privacy and Collaboration ;Using Notes and Customization ;File Management and Rules ;Business Contact Manager Records ;Business Data and Forms ;Keyboard Shortcuts (Windows) and Search and Navigation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6516,
                    "test_name": "Microsoft Visio 2007 Test",
                    "coverage": "Shapes ;Formatting & Keyboard Shortcuts(windows) ;Flowcharts & General & Network Diagrams ;Data ;Business Diagrams ;Web site Diagrams & Maps & Floor Plans ;Schedule Diagrams ;Database Model Diagrams & File Management ;Setting up Pages & Security ;Inserting Drawings & pages & Customizing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 6517,
                    "test_name": "Selling Skills Test",
                    "coverage": "Sales Methods ;Sales Management ;Sales Strategy ;Sales Concepts ;Sales Process ;Sales Promotion ;Sales Techniques ;Sales Technology ;Customer Service",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 6588,
                    "test_name": "Time Management Test",
                    "coverage": "Stress Management ;Planning Time ;Monitoring Time ;Time Management Tools ;Time Management Concepts ;Spending, Saving and Investing Time",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6593,
                    "test_name": "Firewall Concepts Test",
                    "coverage": "Basics of Firewalls ;Attacks and Firewalls ;TCP/IP for Firewalls ;Introduction to Firewalls ;Management and Configuration of Firewalls ;Firewall Security Policies ;Troubleshooting Firewalls",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6594,
                    "test_name": "Checkpoint Security Test",
                    "coverage": "User Authentication ;Managing Checkpoint VPN-1 NGX ;VPN and Encryption ;Installation and Configuration of Checkpoint ;Network Address Translation ;Common Issues of VPN-1 NGX ;Introduction to Checkpoint VPN-1 NGX ;Content Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6595,
                    "test_name": "MS SQL Server 2005 Test",
                    "coverage": "Performance ;RDBMS Concepts ;Data Retrieval ;SQL Queries ;DDL and DML ;Advanced SQL ;SQL Basics ;Security and Recovery",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 6596,
                    "test_name": "Solaris 10 U4 Test",
                    "coverage": "Installation ;Security ;General ;SERVICES ;ZETA FILE SYSTEM ;Zones ;Projects ;NFS ;UNIX Commands ;Runlevels",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 6597,
                    "test_name": "Test of Knowledge of Joomla! 1.5",
                    "coverage": "Files and Folders ;Interface ;Installation and Configuration ;Joomla Extensions ;Plug Ins ;Managing a Professional Deployment ;PHP and Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6603,
                    "test_name": "Fiber Optics Test",
                    "coverage": "Optical Fundamentals ;Signal Degradation ;Optical Sources ;Optical Measurements ;Optical Detectors ;Optical Networks",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6604,
                    "test_name": "VLSI Test",
                    "coverage": "IC Fabrication ;MOS Technology ;VHDL ;Basic Electrical Properties of MOS and BiCMOS Circuits ;MOS and BiCMOS Circuit Design Processes ;Basic Circuits Concepts ;Scaling of MOS Circuits",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6605,
                    "test_name": "Embedded Systems Test",
                    "coverage": "Introduction to Microcontrollers ;Design of Embedded Systems ;Intel 8051 ;8051 ALP ;Instruction Set of 8051 ;Timer & Counter ;8051 Microprocessor ;Introduction to Microcontrollers 8051 ;Serial Communication",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6606,
                    "test_name": "Digital Signal Processing Test",
                    "coverage": "Analysis of Signals ;Classification of Signals ;Classification of Systems ;Discrete Fourier Transform and Fast Fourier Transform ;Digital Filter Design ;DSP Processors Architecture ;Multirate Digital Signal Processing ;Power Spectrum Estimation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6610,
                    "test_name": "Advanced PHP Test",
                    "coverage": "Operators ;Functions ;General ;Types ;Constructs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6611,
                    "test_name": "PostgreSql 8.1.3 Test",
                    "coverage": "Triggers ;Advanced Concepts ;SQL ;Installation and Configuration ;Datatypes ;Backup and Restore ;Full Text Search",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 6612,
                    "test_name": "Internet Security Test",
                    "coverage": "Security Technologies and Concepts ;Cryptography and PKI ;Attacks and Vulnerabilties ;Authentication Fundamentals ;E-mail Security ;Remote Access Security ;Viruses",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6613,
                    "test_name": "Voice Over IP Test",
                    "coverage": "Network Fundamentals ;Traditional Telephony ;VoIP Basics and Introduction ;VoIP Technologies and Standards ;VoIP Signaling Protocols and Quality of Service ;VoIP Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6614,
                    "test_name": "Virtual Private Network Test",
                    "coverage": "VPN Basics ;PPTP and L2TP VPN ;IPSec Concepts ;MPLS VPN ;Attacks and Vulnerabilities ;Encryption and VPN ;SSL VPN",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6648,
                    "test_name": "Antispam and Antivirus Test",
                    "coverage": "Antivirus ;Email Security ;Email Concepts ;Antispam ;Email Threats and Attacks ;Virus Fundamentals ;Encryption and Decryption",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6649,
                    "test_name": "Digital Electronics Test",
                    "coverage": "Memories ;Shift Registers and Counters ;Sequential Circuits ;Combinational Logic ckt ;Flip-Flops ;Number Systems ;Logic Gates ;A/D and D/A Converters",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6650,
                    "test_name": "Drupal 5 Test",
                    "coverage": "Drupal Interface and Database ;Working with Users, Nodes and Filters ;Blocks and Themes ;Taxonomy and Caching ;Sessions and Forms ;Drupal Style Sheets and Module",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6651,
                    "test_name": "Semiconductor Electronics Test",
                    "coverage": "Oscillators ;Vacuum Tubes ;Semiconductor Physics and Devices ;Transistors ;Transistor Amplifiers ;Transistor Tuned Amplifiers ;Switching Circuits ;Field Effect Transistors(FET)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6652,
                    "test_name": "WordPress 2.5.1 Test",
                    "coverage": "Advanced Topics ;Features ;Interface ;Installation and Configuration ;Developer Functionality ;Security and Privacy ;Miscellaneous",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 6660,
                    "test_name": "Facebook Open Platform Development Test",
                    "coverage": "Facebook API Information Scripting ;Facebook API Basic Concepts ;Facebook API Methods ;Facebook Data Store API and FQL ;Facebook Authentication",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 6662,
                    "test_name": "Online Article Writing and Blogging Test (U.S. Version)",
                    "coverage": "Copyright Issues ;How to Source Information ;Optimizing Content for Search Engines ;Blog Writing Skills ;Writing Style For the Web ;Articles to Promote a Product or Service ;Targeting Your Audience ;Dos and Don'ts of Online Writing and Blogging ;Plagiarism on the Web",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6664,
                    "test_name": "Electronic Design Test",
                    "coverage": "Operational Amplifier ;Oscillators ;Amplifiers ;Power Amplifiers ;Feedback Amplifiers ;Rectifiers ;Power Electronics ;Feedback Circuits",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6666,
                    "test_name": "OpenGL Programming Test",
                    "coverage": "Matrices ;General ;Geometry ;C Code ;GLSL ;GL Utility Toolkit ;Performances ;Textures ;Picking ;Fixed Pipeline",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6668,
                    "test_name": "Game Programming Concepts Test",
                    "coverage": "Particles ;Rendering ;3d Modeling ;Network ;General Questions ;Audio ;Texturing ;Maths ;Programming ;GPU ;Visual Effects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6670,
                    "test_name": "OpenSocial Test",
                    "coverage": "Miscellaneous ;OpenSocial API ;Configuration and Implementation ;OpenSocial for Orkut ;OpenSocial Namespaces ;Integration with Google App Engine ;Persistence API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6672,
                    "test_name": "Mac OS X 10.5 Test",
                    "coverage": "Printing ;General ;User Interface ;Network ;Filesystem ;Command Line ;Internet and Email ;GUI",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 6674,
                    "test_name": "PCB Design Test",
                    "coverage": "Printing ;Layout Planning ;Design Of a Digital Circuit PCB ;Analog Circuit PCB ;Film Master Preparation ;Plating and Etching ;PCB Technology Trends ;Multilayer Boards ;Soldering Technique",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6677,
                    "test_name": "USB Electronics Test",
                    "coverage": "Serial Communication ;USB Fundamentals ;I/O Buses ;USB Introduction ;Memory Basics ;Magnetic Storage ;Optical Storage",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6679,
                    "test_name": "System Programming Test",
                    "coverage": "Performance ;Unix Tool Chain ;Unix System Calls ;Interprocess Communication ;Standard Unix Libraries ;Multi Threaded Programming ;Debugging Unix Applications ;Network Programming",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6686,
                    "test_name": "Creative Writing Test - Fiction (U.S. Version)",
                    "coverage": "Publishing ;Editing ;Reading to Become a Writer ;Plot ;Fiction I ;Characters ;Structure ;Fiction II",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6690,
                    "test_name": "Paypal Integration for Mobile Skills Test",
                    "coverage": "PayPal Payment Processing Basics ;PayPal Sandbox ;NVP API and SOAP API ;Express Checkout ;PayPal Order Management ;Website Payments Standard Integration ;Mobile Setup For Android OS ;Mobile Setup For iPhone OS",
                    "total_questions": 50,
                    "duration": 50,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 6693,
                    "test_name": "Wi Fi Test",
                    "coverage": "WLAN Concepts ;RF Fundamentals ;WLAN Technologies and Protocols ;WLAN Devices and Networking ;WLAN Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6695,
                    "test_name": "Digital Imaging Test",
                    "coverage": "Introduction ;Image Perception ;Image Sampling ;Image Filtering ;Image Analysis ;Image Compression ;Digital Measurement",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 6700,
                    "test_name": "Principles of Web Graphics Design Test",
                    "coverage": "Typography ;Layout and Composition ;Color Sense ;Texture ;Imagery",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6724,
                    "test_name": "3ds Max 9 Test",
                    "coverage": "Animation ;User Interface and Surface Modeling ;Reactor ;Modifier ;Camera and Lights ;Effects and Environments ;Material,Maps and Material Editor ;Character Studio ;Renderers ;Managing Scenes",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6725,
                    "test_name": "Wimax Technology Test",
                    "coverage": "WiMAX Basics ;WiMAX Standard and Applications ;WiMAX Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6726,
                    "test_name": "Kernel Programming Test (Solaris 2.x internals)",
                    "coverage": "Memory ;Debugging ;Filesystem ;Locking, Mutex ;Locking, Reader-Writer ;Locking, Synchronization ;Locking, Semaphores ;Processor Architecture ;Loadable Modules ;Drivers ;Threads, Processes and Scheduling",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6730,
                    "test_name": "Book keeping Test",
                    "coverage": "Invoicing ;Accounts Receivable ;Accounts Payable ;Inventory ;Accounting ;Accounting Process ;Job Costing ;Bank Reconciliation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6731,
                    "test_name": "QuickBooks Pro 2008 Test",
                    "coverage": "Accounts Receivable ;Accounts Payable ;Payroll ;Banking ;Reports ;QuickBooks Overview ;Creating a New Data File ;Year End Procedures ;Items ;Sales Tax ;Customers, Banking and Journal Entries",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6733,
                    "test_name": "U.S. English Proofreading Skills Test (Chicago)",
                    "coverage": "Indexes ;Punctuation ;Documentation ;PROOFREADING FOR CONSISTENCY & ACCURACY ;GRAMMAR & USAGE ;NUMBER USAGE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6734,
                    "test_name": "Cocoa programming for Mac OS X 10.5 Test",
                    "coverage": "Threads ;Memory Management ;Events ;General ;Views ;Datatype and Structures ;Class Hierarchy ;Notifications ;Resources",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6739,
                    "test_name": "Understanding differences in British and American English Test",
                    "coverage": "Vocabulary ;Grammar ;Numbers ;Spelling ;Writing ;Pronunciation ;Verbs ;Common Phrases",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6741,
                    "test_name": "osCommerce v2.2 Test",
                    "coverage": "Configuration ;osCommerce Interface and Tools ;Catalog, Stylesheet Definitions, Shipping and Payment ;Errors and Classes",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6742,
                    "test_name": "iPhone Programming OS 2.1 Test",
                    "coverage": "Threads ;Memory Management ;Event Handling ;Graphics ;Network ;Application Architecture ;Views ;Xcode ;Objective-C ;Human Interface Guidelines ;Internationalization ;Audio ;UIKit Framework ;Address Book",
                    "total_questions": 50,
                    "duration": 50,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6744,
                    "test_name": "ooVoo Client API Test",
                    "coverage": "Events ;API Connection ;Call Methods ;Conference Methods ;User Management ;Chat Conference ;Advanced Video Call Methods",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Third Party Tests"
                },
                {
                    "test_id": 6745,
                    "test_name": "English Spelling Test (UK Version)",
                    "coverage": "Spelling",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6746,
                    "test_name": "English Spelling Test (U.S. Version)",
                    "coverage": "Spelling",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6747,
                    "test_name": "English Vocabulary Test (UK Version)",
                    "coverage": "Antonyms ;Synonyms ;HOMOPHONES ;COMMONLY CONFUSED WORDS ;DEFINITIONS ;INFERRED MEANING",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6748,
                    "test_name": "English Vocabulary Test (U.S. Version)",
                    "coverage": "Antonyms ;Synonyms ;HOMOPHONES ;COMMONLY CONFUSED WORDS ;DEFINITIONS ;INFERRED MEANING",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6750,
                    "test_name": "Business Writing Skills Test (UK Version)",
                    "coverage": "E-mail ;BASIC KNOWLEDGE ;GRAMMAR & STYLE ;MEMOS ;BUSINESS LETTERS & DOCUMENTS ;CVs, RESUMES & COVER LETTERS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6752,
                    "test_name": "Windows Vista Administration Test",
                    "coverage": "Troubleshooting ;Security ;Backup and Restore ;Features of Windows Vista ;Deploying Windows Vista ;Windows Vista Desktop Management ;Disk Management ;Windows Vista Networking ;Desktop Health Management ;Network Troubleshooting ;Internet Explorer",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 6754,
                    "test_name": "Online Article Writing and Blogging Test (UK Version)",
                    "coverage": "Copyright Issues ;How to Source Information ;Blog Writing Skills ;Writing Style For the Web ;Articles to Promote a Product or Service ;Targeting Your Audience ;Dos and Don'ts of Online Writing and Blogging ;Plagiarism on the Web ;Optimising Content for Search Engines ;Copyright IssuesCopyright Issues",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6755,
                    "test_name": "Financial Analysis Test",
                    "coverage": "Inventory ;Accounting ;Financial Statements ;Economy ;General Financial Analysis ;Ratio Interpretation ;Ratio Formulas ;Ratio Purpose ;Analysis in Practice",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6756,
                    "test_name": "Accounts Payable Test",
                    "coverage": "Fundamentals of A/P ;A/P Journal Entries ;Recording Transactions ;Accrued and Prepaid Expenses ;Deposits and Other Advances ;Taxes and Payables ;Sales and Use Tax ;Invoice ;VAT ;Travel and Entertainment",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6757,
                    "test_name": "Accounts Receivable Test",
                    "coverage": "Fundamentals of Accounts Receivable ;Accounts Receivable Ratios ;Entering Receivables ;Recording and Accounting for Revenue ;Preparing Credit and Collections ;Maintaining Receivables Ledgers ;Adjustments",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6758,
                    "test_name": "Financial Reporting Test",
                    "coverage": "Accounting ;Financial Statements ;General Financial Reporting ;External Financial Reporting ;Balance Sheet ;Income Statement ;Equity ;Trial Balance ;Statement of Cash Flows",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6760,
                    "test_name": "UK English Grammar Test (For Writing Professionals)",
                    "coverage": "Sentence Structure ;Pronoun Usage ;PRONOUN-ANTECEDENT AGREEMENT ;VERB TENSES ;SUBJECT-VERB AGREEMENT ;MODIFIERS ;COMPARISONS ;DICTION & WORD CHOICE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6762,
                    "test_name": "UK English Proofreading Skills Test (Oxford Guide to Style)",
                    "coverage": "Indexes ;Punctuation ;Documentation ;PROOFREADING FOR CONSISTENCY & ACCURACY ;GRAMMAR & USAGE ;NUMBER USAGE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6763,
                    "test_name": "U.S. English Sentence Structure Test (For Writing Professionals)",
                    "coverage": "MODIFIERS ;SENTENCE TYPES ;BASIC PARTS OF A SENTENCE ;CLAUSES ;PHRASES ;CONNECTING & TRANSITIONAL WORDS ;STRUCTURE I: PARALLELISM ;STRUCTURE II: AGREEMENT ;STRUCTURE III: MISPLACED MODIFIERS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6764,
                    "test_name": "UK English Sentence Structure Test (For Writing Professionals)",
                    "coverage": "MODIFIERS ;SENTENCE TYPES ;BASIC PARTS OF A SENTENCE ;CLAUSES ;PHRASES ;CONNECTING & TRANSITIONAL WORDS ;STRUCTURE I: PARALLELISM ;STRUCTURE II: AGREEMENT ;STRUCTURE III: MISPLACED MODIFIERS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6765,
                    "test_name": "UK English Basic Skills Test",
                    "coverage": "Punctuation ;Sentence Structure ;Pronouns ;Indirect Speech ;ARTICLES AND CONJUNCTIONS ;PREPOSITIONAL PHRASES ;ADJECTIVES AND ADVERBS ;VERBS AND VERB TENSES ;WORD ORDER",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6766,
                    "test_name": "Russian To English Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Time expressions ;Adjectives ;Syntax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6767,
                    "test_name": "Spanish To English Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Syntax and Adjectives",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6770,
                    "test_name": "English To French Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Adjectives ;Syntax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6771,
                    "test_name": "Creative Writing Test - Fiction (UK Version)",
                    "coverage": "Publishing ;Editing ;Reading to Become a Writer ;Plot ;Fiction I ;Characters ;Structure ;Fiction II",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6772,
                    "test_name": "Creative Writing Test - Non-fiction (UK Version)",
                    "coverage": "Publishing ;Poetry ;Non-fiction ;Other Types of Writing ;Journal Writing ;Online Creative Writing ;Screenplays ;Plays",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6773,
                    "test_name": "Creative Writing Test - Non-fiction (U.S. Version)",
                    "coverage": "Publishing ;Poetry ;Non-fiction ;Other Types of Writing ;Journal Writing ;Online Creative Writing ;Screenplays ;Plays",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6777,
                    "test_name": "French To English Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Adjectives ;Syntax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6778,
                    "test_name": "Components Of Financial Statement Test",
                    "coverage": "General Financial Statements ;Accounting Cycle ;Ratio Comparison ;Accounting Transactions ;Accounting Institutions ;Financial Ratio Formulas ;Ratio Selection",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6779,
                    "test_name": "Financial Forecasting Test",
                    "coverage": "General Financial Forecasting ;Assumptions ;Valuation ;Capitalization ;Revenue ;Summary Financials ;Profit & Loss Forecast ;Cash Flow Forecast ;Balance Sheet Forecast ;Variance & Sensitivity",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6780,
                    "test_name": "General Financial Accounting Test",
                    "coverage": "General Accounting ;Accounting Process ;Debits & Credits ;Account Classification ;Year End Adjustments ;Balance Calculation ;Accounting Definitions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6784,
                    "test_name": "Inventory Management Test",
                    "coverage": "General Inventory ;Inventory Management ;Inventory Definitions ;Inventory Costing ;Inventory Accounting ;Inventory Formulas",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6785,
                    "test_name": "English To Italian Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6786,
                    "test_name": "Italian To English Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6787,
                    "test_name": "German To English Translation Skills Test",
                    "coverage": "Prepositions ;Articles ;Pronouns ;Verbs ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Adjectives ;Syntax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6788,
                    "test_name": "UK English Oxford Style Editing Skills Test (For Writing Professionals)",
                    "coverage": "VERB AND TENSE ERRORS ;GRAMMAR AND USAGE ERRORS ;SENTENCE STRUCTURE ERRORS I: AGREEMENT & PARALLELISM ;SENTENCE STRUCTURE ERRORS II: MODIFIERS & COMPARISONS ;PUNCTUATION ERRORS ;DICTION ERRORS ;STYLE ERRORS ;SPECIAL EDITING ISSUES",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6790,
                    "test_name": "Payroll Management Test",
                    "coverage": "Employment and Payroll Laws ;Timekeeping and Gross Earnings ;Withholding Taxes ;FICA and Unemployment Taxes ;Preparing and Distributing Payroll ;Deposit and Reporting Requirements ;Accounting Fundamentals ;Payroll Systems ;Payroll Calculations",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6791,
                    "test_name": "Accounting Skills Test (Assets and Revenue)",
                    "coverage": "Accounting ;Capitalization ;Doubtful Accounts ;Operating Cycle ;Revenue Calculation ;Depreciation ;Classification ;Depreciation Methods",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6792,
                    "test_name": "Accounting Skills Test (Cash Flow)",
                    "coverage": "General Cash Flow Statements ;Cash Flow Classification ;Cash Flow Cycle ;Effect on Cash ;Cash Flow and Equity ;Cash Flow and Debt Financing ;Cash Flow Transactions ;Calculating Cash Flow",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6793,
                    "test_name": "Accounting Skills Test (Reporting Earnings)",
                    "coverage": "Accounting ;Financial Statements ;Dividends ;Shares ;Corporations and Transactions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6794,
                    "test_name": "Accounting Skills Test (Securities, Derivatives and Investments)",
                    "coverage": "Accounting ;Taxation ;Methodology ;Financial Reporting ;Leases ;Derivatives ;Other Investments",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6814,
                    "test_name": "Business Plans Test",
                    "coverage": "Marketing ;Business Plan Sections ;Forecasting & Budgeting ;Business Model ;Strategy ;Competition ;The Market ;General Business Planning",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 6815,
                    "test_name": "Accounting Principles Test",
                    "coverage": "Financial Reporting ;Sarbanes Oxley Act ;Regulatory Agencies ;Accounting Principles ;Inventory Concepts ;Accounting for Private Non-Profit organizations ;Financial Reporting and Securities and Exchange Commission",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6822,
                    "test_name": "Lending Practices and Loans Test",
                    "coverage": "Loan Terminology ;Mortgage Loan Terminology ;General Loans ;Credit Cards ;Loan Abuse ;Taxation and Loans ;Mortgage Loans ;Accounting for Loans",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6823,
                    "test_name": "Retail Banking Industry and Processes Test",
                    "coverage": "General Banking ;Banking Terminology ;Regulation of Banking by the Government ;Types of Bank Accounts ;Negotiable Instruments ;Offshore Banking ;Banks as a Business",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6825,
                    "test_name": "PC Graphics Test",
                    "coverage": "Graphics ;Rendering ;Computer Graphics ;3D projection ;Ray tracing ;Texture mapping ;Shading ;Dithering ;Vector graphics ;Anti-aliasing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Hardware"
                },
                {
                    "test_id": 6827,
                    "test_name": "Objective C Test",
                    "coverage": "Memory Management ;Exceptions ;Protocols ;General ;Best Practices ;Internals ;C ;Messaging ;Categories",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6828,
                    "test_name": "Marketing Methods and Techniques Test",
                    "coverage": "General Marketing ;The Four Ps of Marketing ;Extended Marketing Mix ;New Marketing Methods ;Marketing Communication ;Customer Focus Marketing ;Product Focus Marketing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 6829,
                    "test_name": "Taxation Test",
                    "coverage": "Fundamentals of 1040 ;Income ;Gains and Losses ;Adjustments to Income ;Itemized Deduction ;Fundamentals of 1120 ;Corporate Tax-C&S Corporations ;Corporate Tax-Partnership ;Corporate Tax Deductions ;Non Profit Organizations",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6830,
                    "test_name": "English To German Translation Skills Test",
                    "coverage": "Prepositions ;Pronouns ;Participles and Gerunds ;Indirect Speech ;Time expressions ;Adjectives ;Syntax ;Articles and Verbs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 6833,
                    "test_name": "Publishing Fundamentals Test",
                    "coverage": "Printing ;Marketing ;Editorial ;Design ;Production ;Sales ;Publishing Industry",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 6835,
                    "test_name": "Operations Management Test",
                    "coverage": "Performance Monitoring ;Organizational Structure ;Production Management ;Operations Management Concepts ;Production Methods ;Quality Assurance ;Distribution ;Design Engineering",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6837,
                    "test_name": "ASP.Net 2.0 using C# Test",
                    "coverage": ".NET Framework: General ;Administration and Configuration ;ASP.Net Controls ;ASP.Net General Development ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6838,
                    "test_name": "ASP.Net 2.0 using VB Test",
                    "coverage": ".NET Framework: General ;Administration and Configuration ;ASP.Net Controls ;ASP.Net General Development ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6839,
                    "test_name": "ASP.Net 3.5 using VB Test",
                    "coverage": ".NET Framework: General ;Administration and Configuration ;ASP.Net Controls ;ASP.Net General Development ;Language: General ;Language: Intermediate ;.NET Framework: New Features ;AJAX ;Language: New Features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6841,
                    "test_name": "DotNet 2.0 using C# Test",
                    "coverage": ".NET Framework: General ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces ;.NET Framework: Advanced ;.NET Framework: Data ;.NET Framework: Intermediate ;Language: Advanced",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6842,
                    "test_name": "DotNet 2.0 using VB Test",
                    "coverage": ".NET Framework: General ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces ;.NET Framework: Advanced ;.NET Framework: Data ;.NET Framework: Intermediate ;Language: Advanced",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6843,
                    "test_name": "Amazon Web Services Test",
                    "coverage": "Amazon Elastic Compute Cloud ;Amazon Storage ;Amazon Databases ;Networking and Content Delivery ;Amazon E-Commerce, Flexible Payment and Fulfillment Web Service",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6844,
                    "test_name": "DotNet 3.5 using C# Test",
                    "coverage": ".NET Framework: General ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces ;.NET Framework: New Features ;Language: New Features ;.NET Framework: Advanced ;Language: Advanced",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6845,
                    "test_name": "DotNet 3.5 using VB Test",
                    "coverage": ".NET Framework: General ;Language: General ;Language: Intermediate ;Language: Types, Classes, and Interfaces ;.NET Framework: New Features ;Language: New Features ;.NET Framework: Advanced",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 6847,
                    "test_name": "Twitter Developer Test",
                    "coverage": "Fundamentals ;Rate Limiting ;Status Methods ;Notification, Accounting and Help Methods ;Return Value, Block and Favorite Methods ;Friendship, Direct Message and Social Graph Methods ;Search API",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6848,
                    "test_name": "Resume Writing Skills Test",
                    "coverage": "TYPES OF RESUMES ;RESUME CONTENT ;DESIGN AND LAYOUT ;LANGUAGE USE AND SENTENCE STRUCTURE ;COVER LETTERS ;GENERAL KNOWLEDGE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6855,
                    "test_name": "Grant Writing Test",
                    "coverage": "Meaning and Understanding of Grant Proposal ;Headings in Grant Proposal ;Terms Used in Grant Proposals ;Drafting a Grant Proposal ;Aims and Objectives of Grant Proposal ;Language and Diction in Grant Proposal ;Seeking Grants ;Types of Grants",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6856,
                    "test_name": "Adobe Photoshop CS4 Extended Test",
                    "coverage": "Filters ;Layers ;3D and Technical Imaging ;Working with Images and Camera Raw ;Workspace and Automating Tasks ;Video and Animation ;Using Color and Web Graphics ;Using Masks and Channels",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6858,
                    "test_name": "U.S. Word Usage Test",
                    "coverage": "WORD USAGE ;WORD MEANING ;SHADES OF MEANING ;PREPOSITIONAL IDIOMS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6860,
                    "test_name": "Corporate Strategy Test",
                    "coverage": "Finance Strategy ;Markets and Positioning ;Workforce Strategy ;Planning Tools and Techniques ;Delivering Change ;Stakeholder Management ;Measuring Performance ;Mergers and Acquisitions ;Production Strategy",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6861,
                    "test_name": "Windows Server 2008 Test",
                    "coverage": "Fundamentals ;Administration ;Security ;Active Directory ;Network Infrastructure",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6862,
                    "test_name": "Event Planning Test",
                    "coverage": "Event Planning Terminology ;Event Planning Basics ;Corporate Event Planning ;Leisure and Entertainment Event Planning ;Family Event Planning ;Writing about Event Planning ;Event Planning Marketing and Promotion ;Event Planning Finance and Funding",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6863,
                    "test_name": "eBay Web Services Test",
                    "coverage": "Merchandising API ;Trading API ;Client Alerts API ;Feedback API ;Shopping API ;Merchant Data API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6864,
                    "test_name": "U.S. Academic Writing Test",
                    "coverage": "Forms of Academic Writing ;Elements of Academic Writing ;Citation Writing Styles ;Academic Journals and Online Writing ;Academic Bibliography ;Academic Writing and Plagiarism ;Academic Paper Style ;Academic Paper Structure ;Academic Paper Terminology",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6867,
                    "test_name": "U.S. Public Speaking Test",
                    "coverage": "COMMUNICATIONS AND LISTENING SKILLS ;TYPES OF SPEECHES ;SPEECH WRITING I: PLANNING AND STRUCTURE ;SPEECH WRITING II: RESEARCH, EVIDENCE, AND ARGUMENT ;PREPARING AND USING PRESENTATIONAL AIDS ;SPEECH DELIVERY TECHNIQUES ;AUDIENCE ANALYSIS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6868,
                    "test_name": "Generally Accepted Accounting Principles (GAAP) Test",
                    "coverage": "Inventory Costs ;Impairment of Long Lived Assets ;Capitalization of Interest Costs ;Contingencies ;Convertible Debt ;Derivatives and Hedging Activities ;Stock, Dividends and Splits ;Earnings Per Share ;Income Taxes ;Discontinued Operations ;Comprehensive Income ;Consolidation of Financial Statements ;Accounting Changes and Error Correction",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6869,
                    "test_name": "Venture Capital Test",
                    "coverage": "Venture Capital Industry ;Venture Capital Funds ;Portfolio Management ;Venture Capital Evaluation Process ;Term Sheets and Investment Structure ;Due Diligence Process ;Investment Process ;Post-Funding Involvement ;Equity, Debt & Convertible Debt ;Exit Strategies",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6870,
                    "test_name": "Dreamweaver CS4 Test",
                    "coverage": "CSS ;Linking And Previewing ;Laying Out Pages with HTML ;Adding Contents to Page ;Creating Templates ;Javascript Behaviors ;Working with Dynamic Pages and Assets and Libraries ;Spry",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6871,
                    "test_name": "Market Research Test",
                    "coverage": "Market Research &#8212; Methods ;Market Research &#8212; Surveys ;Market Research &#8212; Concepts ;Market Research &#8212; Analysis and Statistics ;Market Research &#8212; Outcomes ;Market Research &#8212; Tools ;Market Research &#8212; Market and Competitor Analysis ;Market Research &#8212; Forecasting ;Market Research &#8212; Statistical Examples",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 6872,
                    "test_name": "Adobe Illustrator CS4 Test",
                    "coverage": "Painting ;Reshaping Objects ;Type ;Working with Color and Drawing ;Selecting Objects and 3D Objects ;Importing, Exporting and Saving Files ;Creating Special Effects and Using Graph ;Web Graphics and Automating Tasks",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6874,
                    "test_name": "Spanish Sentence Structure Test",
                    "coverage": "MODIFICADORES ;TIPOS DE ORACI&#211;N ;ELEMENTOS B&#193;SICOS DE UNA ORACI&#211;N ;PROPOSICIONES ;FRASES ;CONECTORES ;SINTAXIS I: PARALELISMO ;SINTAXIS II: CONCORDANCIA ;SINTAXIS III: MODIFICADORES MAL COLOCADOS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 6877,
                    "test_name": "Day Trading Test",
                    "coverage": "Terminology ;Trading Methodologies ;Leveraging Capital ;Entry and Exit Points ;Analysis Techniques ;Legal Regulations ;Short Selling",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6878,
                    "test_name": "Knowledge of Google AdWords Test",
                    "coverage": "Setting AdWords Budgets ;AdWords Reports ;Designing Your AdWords Ad ;AdWords Concepts ;Advanced AdWords Features ;Setting up an AdWords ad Campaign ;Ads Creation & Compliance",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6879,
                    "test_name": "Report Writing Test",
                    "coverage": "Report Writing for Sports and the Arts ;Business Report Writing I: Purpose and Content ;Business Report Writing II: Language and Format ;Academic Report Writing ;Presentation Report Writing ;Journalistic Report Writing ;Online Report Writing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6880,
                    "test_name": "Stock Trading Test",
                    "coverage": "Terminology ;Portfolio Management ;Market Cycles ;Fundamental and Technical Analysis ;Trading Strategies ;Identifying Market Trends ;Trading Goals ;Limits, Stops, Stop Losses ;Managing Risk",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6882,
                    "test_name": "U.S. English Punctuation and Mechanics Test",
                    "coverage": "END PUNCTUATION: PERIODS, QUESTION MARKS, EXCLAMATION POINTS ;COMMAS ;SEMI-COLONS AND COLONS ;APOSTROPHES ;DOUBLE AND SINGLE QUOTATION MARKS ;HYPHENS AND DASHES ;PARENTHESES AND BRACKETS ;MECHANICS: CAPITALS, ABBREVIATIONS, ITALICS, UNDERLINING ;PUNCTUATION PRACTICE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 6883,
                    "test_name": "Knowledge of Salesforce Test",
                    "coverage": "Application Framework ;Web Service API ;Database Services ;Packaging ;Salesforce Features and Fundamentals ;Apex Code ;VisualForce",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6884,
                    "test_name": "Options Trading Test",
                    "coverage": "Portfolio Management ;Trading Strategies ;Managing Risk ;Options Terminology ;Technical Analysis ;Limiting Downside",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 6885,
                    "test_name": "Knowledge of ISO 9001 Test",
                    "coverage": "ISO Background, History and Terminology ;ISO9001 Principles and Approach ;ISO9001 Quality Management System ;ISO9001 Management Responsibility ;ISO9001 Resource Management ;ISO9001 Product Realization ;ISO9001 Measurement, Analysis and Improvement",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6886,
                    "test_name": "Action Script 3.0 Test",
                    "coverage": "Events and Event Handling ;Programming Fundamentals ;Object-oriented programming in ActionScript ;Strings ;Regular Expressions ;Arrays ;Exception and Error Handling ;Working with XML and E4X ;Working with dates and time",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6887,
                    "test_name": "Adobe Flex 3.0 Test",
                    "coverage": "Modules ;Basics of Flex ;Introduction to Flex UI ;Data Providers and Collections ;Events and Event Handling ;Working with Controls ;Containers ;Effects, View States and Transitions ;Styling of Components ;Item Editors, Item Renderers and Repeaters ;Validators and Formatters",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6888,
                    "test_name": "Adobe Flash CS4 Test",
                    "coverage": "Action Script ;Symbols and Assets ;Timelines and Animation ;Sound and Video ;Imported Artwork and Text ;Editing Artwork and 3d graphics ;Publishing,Exporting and Filters ;Managing Documents,Workspace and Screens",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6889,
                    "test_name": "Adobe InDesign CS4 Test",
                    "coverage": "XML ;Text ;Styles and Anchored Objects ;Drawing and Graphics ;Frames,Objects and Typography ;Color and Transparency Effects ;Tables and Documents ;Hyperlinks and Dynamic Documents",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6891,
                    "test_name": "Knowledge of Google AdSense Test",
                    "coverage": "AdSense Reports ;AdSense for Content ;AdSense for Search ;Managing AdSense Ads ;Managing AdSense Channels ;Google AdSense Payments ;Adsense for Mobile Content",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6892,
                    "test_name": "Knowledge of Google Analytics Test",
                    "coverage": "Google Analytics Tracking Code ;Google Analytics Filters ;Google Analytics Campaign Tracking ;Google Analytics Goals and Funnels ;Google Analytics Reports ;Analyzing Google Analytics Data",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6893,
                    "test_name": "Knowledge of Google Website Optimizer Test",
                    "coverage": "Website Optimizer Basics ;Website Optimizer Experiments ;Website Optimizer Validation ;Multivariate Experiments ;Data and Reports ;A/B Experiments",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6894,
                    "test_name": "Knowledge of Google Webmaster Central Test",
                    "coverage": "Google Webmaster Tools - Basics ;Google Webmaster Tools - Settings ;Google Webmaster Tools - Diagnostics ;Google Webmaster Guidelines ;Sitemaps ;Google Webmaster Tools",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6895,
                    "test_name": "Apache Server Test (2.0 Family)",
                    "coverage": "Installation ;Administration ;Directives ;Configuration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6896,
                    "test_name": "Chemical Engineering Test",
                    "coverage": "Chemical Engineering Thermodynamics ;Stoichiometry and Electrochemistry ;Chemical Engineering Fluid Mechanics ;Chemical Engineering Heat Transfer ;Chemical Engineering Mass Transfer ;Chemical Reaction Engineering",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 6899,
                    "test_name": "XML 1.0 Test (Fifth Edition)",
                    "coverage": "Fundamentals ;DTDs ;XHTML ;XLink ;XSL ;XPath ;XML DOM ;XSD ;XForms",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 6900,
                    "test_name": "Knowledge of Joomla 1.5.x Test",
                    "coverage": "Installation ;Configuration ;Media Manager ;User Manager ;Content Manager ;Menu Manager ;Extensions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6901,
                    "test_name": "CSS 3 Test",
                    "coverage": "Fundamentals ;Selectors ;Basic Styles ;Page Media ;Basic User Interface ;Color Styles ;Font Styles ;Speech and Ruby ;Text and Style Attribute Syntax ;2D, 3D and Animation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6902,
                    "test_name": "Statistical Quality Control Test",
                    "coverage": "Concept of Quality ;Total Quality Management ;Normal Distribution ;Theory of Probability and Probability Distribution ;Acceptance Sampling ;Control Chart ;Reliability, Availability and Maintainability ;Process Capability",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6903,
                    "test_name": "Business Mathematics Test",
                    "coverage": "Ratio and Proportion ;Depreciation ;Percentages ;Partnership ;Profit and Loss ;Discounts ;Simple and Compound Interest ;Data Analyzing Techniques",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6904,
                    "test_name": "Palm webOS Application Development",
                    "coverage": "Palm webOS Basics ;Palm webOS APIs ;Palm webOS Widgets ;Palm webOS Service API ;Palm webOS UI & Style Guidelines ;Palm webOS Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 6910,
                    "test_name": "RSS  2.0 Test",
                    "coverage": "RSS Basics ;RSS Datatypes ;RSS Elements ;RSS Modules and RSS Aggregator",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6922,
                    "test_name": "Knowledge of Joomla Coding Techniques Test",
                    "coverage": "Security ;Components ;Templates ;General ;Modules ;Miscellaneous ;Plugins ;Database ;Localization",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Open Source Tools and Technologies"
                },
                {
                    "test_id": 6923,
                    "test_name": "Programming Aptitude Test",
                    "coverage": "Logical Reasoning ;Numerical Aptitude",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 6926,
                    "test_name": "Dimdim Test",
                    "coverage": "Dimdim Features for Businesses ;Dimdim Built-in Features ;Dimdim 4.5 Features ;Audio and Video Settings ;UI Customization ;Conducting Successful Meetings with Dimdim ;Desktop and File Sharing ;Hardware and Browser Settings for Dimdim ;Dimdim Integration and API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6935,
                    "test_name": "Zoho Creator Test",
                    "coverage": "Scripting ;Views ;Application Creation ;Forms and Fields",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6936,
                    "test_name": "Negotiations Skills Test",
                    "coverage": "Basic Negotiation Skills ;General Negotiating Process ;Personality Traits in Negotiations and Preparing for Negotiations ;Body Language ;Clarity in Communication and Closing Negotiations ;Negotiating Difficult Points ;Making Negotiations Progress Effectively ;Handling Tense Negotiations",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 6954,
                    "test_name": "Central Desktop Test",
                    "coverage": "Central Desktop Account and Dashboard ;Central Desktop Workspaces ;Central Desktop Files and Discussions ;Central Desktop Administration ;Central Desktop Web Meetings and Conference Calling ;Central Desktop API ;Central Desktop Plugins",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6966,
                    "test_name": "Yahoo Developer Skills - YAP Test",
                    "coverage": "Miscellaneous ;YAP Components and Features ;Open Application Development ;YML ;Caja ;OpenSocial Compatibility and Web Services ;Open Application Deployment",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6967,
                    "test_name": "Microsoft SharePoint Server 2007 Test",
                    "coverage": "Configuring Office SharePoint Server ;Application Development",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 6968,
                    "test_name": "Codesion Test",
                    "coverage": "Bugzilla Issue Tracking System ;Trac Issue Tracking System ;CVS Repository ;Subversion Repository CVSDude service ;CVSDude User Interface and Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6979,
                    "test_name": "ConceptShare Test",
                    "coverage": "ConceptShare Workspace API ;ConceptShare Users API ;ConceptShare Concepts API ;ConceptShare Workspace folder API",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6980,
                    "test_name": "ProtoShare Skills Test",
                    "coverage": "Miscellaneous ;ProtoShare Basics ;Wireframe Editor (Components and References) ;Project Review & Sharing ;Site Maps and Pages ;Templates and Clippings ;Rich Internet Simulations",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6982,
                    "test_name": "Yahoo Developer skills - Data APIs Test",
                    "coverage": "OAuth and BBAuth API ;BOSS API ;Updates and Contact API ;Placemaker and Geoplanet API ;Response Formats",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 6983,
                    "test_name": "XML Schema Test",
                    "coverage": "XML Schema Components and Namespaces ;XML Schema Validation ;XML Schema Datatypes ;XML Schema Framework",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 6991,
                    "test_name": "Quark XPress 8.0 Test",
                    "coverage": "Boxes, Lines and Tables ;Text and Typography ;Picture ;Document Construction ;Job Tickets ;Web Layout ;Interactive Layouts ;Collaboration, Single-Sourcing and Color",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 6995,
                    "test_name": "Data Sufficiency Test",
                    "coverage": "Numerical Data Sufficiency ;Word Data Sufficiency ;Graphical Data Sufficiency",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 6998,
                    "test_name": "Data Interpretation Test",
                    "coverage": "Graphical Data Interpretation ;Tabular Data Interpretation ;Text Data Interpretation",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 7000,
                    "test_name": "RDF Test",
                    "coverage": "RDF Basics, Abstracts and Syntax ;RDF Semantics ;RDF Test Cases ;Web Ontology Language (OWL) ;RDF Vocabularies",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7001,
                    "test_name": "Drop.io Skills Test",
                    "coverage": "Drop.io Fundamentals ;Drop.io API ;Drop.io API Libraries ;Consuming and Using REST Services ;Familiarity with Example Applications (usend.io and collab.io)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7002,
                    "test_name": "Assembla Test",
                    "coverage": "Assembla Features ;Assembla Workspace Management ;Assembla Tools ;Assembla Repository ;Assembla Ticketing ;Assembla API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7003,
                    "test_name": "Yahoo Developer skills - Tools and Libraries Test",
                    "coverage": "YQL ;YUI ;YSlow ;Pipes ;Yahoo! Blueprint",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7005,
                    "test_name": "Reading Comprehension Test",
                    "coverage": "Comprehension",
                    "total_questions": 18,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7006,
                    "test_name": "NetBeans Test",
                    "coverage": "NetBeans API ;NetBeans Plugins ;NetBeans and SVN ;NetBeans IDE 6.5 Features ;NetBeans IDE Editor",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Open Source Tools and Technologies"
                },
                {
                    "test_id": 7007,
                    "test_name": "Regular Expressions with PHP Test",
                    "coverage": "Regex Methods and Properties ;Regex Modifiers and Assertions ;Regular Expression Syntax and Operators ;Regex Character Classes or Character Sets ;Regular Expression Tools and Functions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Open Source Tools and Technologies"
                },
                {
                    "test_id": 7010,
                    "test_name": "WordPress 2.8 Test",
                    "coverage": "Administration ;Install & Upgrade ;Theme ;WordPress Code ;Post ;Plug-ins & Widgets",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7012,
                    "test_name": "Mechanical Aptitude Test",
                    "coverage": "Mechanical IQ Test",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 7013,
                    "test_name": "Facebook Connect Test",
                    "coverage": "Facebook Connect Basics ;Incorporating FBML using XFBML ;Social Widgets ;Facebook Connect for iPhone ;Facebook Connect Best Practices ;Facebook Connect APIs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7016,
                    "test_name": "Adobe Photoshop CS3 Test (Mac Version)",
                    "coverage": "Layers ;Type ;Automating Tasks and Keyboard Shortcuts ;Workspace ;Working with Images, Retouching and Transforming ;Color Management ;Color and Tonal Adjustments ;Using Selection and Drawing ;Filters and Saving Images ;Working With Web, Video and Animation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7017,
                    "test_name": "Adobe Illustrator CS3 Test (Mac Version)",
                    "coverage": "Illustrator Interface ;Working with Artwork and Drawing ;Working with Color and Special Effects ;Painting ;Working with Objects and Layers ;Reshaping Objects ;Importing and Exporting Files ;Type ;Web Graphics ;Automating Tasks and Keyboard Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7018,
                    "test_name": "Adobe InDesign CS3 Test (Mac Version)",
                    "coverage": "Working with Text ;Workspace and Interface ;Using Documents, Layers & Text Variable ;Using Printing, Index and Markers ;Working With Drawing & Graphics ;Automation, Frames and Objects ;Swatches & Transparency Effects ;XML ;Using Sharing Content and Tables ;Keyboard Shortcuts & Anchored Objects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7019,
                    "test_name": "Compiler Design Test",
                    "coverage": "Memory Management ;Compilers Design ;Algorithms ;Common Lisp",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7020,
                    "test_name": "Analytical Skills Test",
                    "coverage": "Analytical Skills ;Conditional Letters and Numbers ;Directions ;Relationships ;Time Zones",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 7021,
                    "test_name": "Adobe Flash CS3 Test (Mac Version)",
                    "coverage": "Flash Interface ;Using Artwork, Color and Strokes ;Drawing ;Graphics Objects and Working with Text ;Working with Screens, Symbol and Instances ;Creating Animation ;Using Special Effects and Keyboard Shortcuts ;Working with Sounds and Video ;ActionScript ;Publishing Content, Exporting and Printing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7022,
                    "test_name": "Atom Test",
                    "coverage": "Atom Syndication Basics ;Atom Syndication Constructs ;Atom Syndication Elements ;Securing Atom Documents",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7023,
                    "test_name": "E4X Test",
                    "coverage": "E4X Basics ;E4X Objects, Methods and Properties ;E4X Global Methods and Properties ;E4X Miscellaneous",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7024,
                    "test_name": "Adobe Photoshop CS4 Extended Test (Mac Version)",
                    "coverage": "Filters ;Layers ;3D and Technical Imaging ;Working with Images and Camera Raw ;Workspace and Automating Tasks ;Video and Animation ;Using Color and Web Graphics ;Using Masks and Channels",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7025,
                    "test_name": "Business Strategy Test",
                    "coverage": "Strategy Plans ;Evaluating Past Performance ;Setting Strategic Priorities ;Planning for Contingencies ;Evaluating the Industry and Economic Landscape ;Implementing Strategic Plans ;Creating the Plan ;Competitive Advantages",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 7027,
                    "test_name": "Customer Service Test",
                    "coverage": "Creating Customer Service Strategy ;Resolving Situations Arising out of Bad Customer Service ;Customer Needs ;Customer Relationship Management ;Dealing with Difficult Customers ;Customer Service on the Internet ;Phone Etiquette",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 7028,
                    "test_name": "Material Engineering Test",
                    "coverage": "Material Testing, Material Deformation and Failure ;Crystallography ;Imperfections in Metal Crystals and Solidification of Metals ;Solid Solutions and Phase Diagrams ;Properties of Engineering Materials ;Metallography and Diffusion in Solids ;Application of Engineering Materials ;Iron Carbon System and Heat Treatment Process",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7029,
                    "test_name": "Caspio Test",
                    "coverage": "Caspio Bridge Tables and Views ;Caspio Bridge DataPages and Authentication ;Caspio Bridge Deployment, Relational DataPages and Web Services API ;Caspio Bridge Styles and Localization",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7030,
                    "test_name": "Mobile Web Authoring Test",
                    "coverage": "CSS ;XHTML Mobile Profile ;General Concepts ;Widget Development ;Mobile Web Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7031,
                    "test_name": "Design Considerations for Mobile Web Applications Development Test",
                    "coverage": "User Experience ;Visual Design ;Interaction Design ;Widget Design ;Game Design ;Theme Design ;Multimedia",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7032,
                    "test_name": "Operations Research Test",
                    "coverage": "Queuing Theory ;Simulation ;Game Theory ;Decision Theory ;Sequencing and Replacement Models ;Linear Programming ;Dynamic Programming and Goal Programming ;Transportation Problems ;PERT/CPM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 7036,
                    "test_name": "Integrated Circuits Test",
                    "coverage": "Characteristics of Integrated Circuit Technology ;Integrated Capacitors, Inductors and Semi-conductors ;Multistage Amplifiers, Feedback Amplifiers and Operational Amplifiers ;Linear and Non-linear Analog Systems ;Combinational Digital Systems ;Sequential Digital Systems ;MOS and LSI Systems ;Digital to Analog and Analog to Digital Systems ;Power Circuit Systems",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 7037,
                    "test_name": "Dreamweaver CS4 Test (Mac Version)",
                    "coverage": "CSS ;Linking And Previewing ;Laying Out Pages with HTML ;Adding Contents to Page ;Creating Templates ;Javascript Behaviors ;Working with Dynamic Pages and Assets and Libraries ;Spry",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7038,
                    "test_name": "JSON Test",
                    "coverage": "JSON Schema Definitions ;JSON Request and Module Tags ;JSONPath ;JSON RPC",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7039,
                    "test_name": "Dreamweaver 8 Test (Mac Version)",
                    "coverage": "Tables in Dreamweaver ;Using Cascading Stylesheets ;Workspace & Interface ;Files & Site Management ;Templates & Layout ;Code & Page Contents ;Dynamic Pages & Sites ;Scripting and Behaviors",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7040,
                    "test_name": "German Spelling Test",
                    "coverage": "Schreibweise",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7043,
                    "test_name": "Quark XPress 8.0 Test (Mac Version)",
                    "coverage": "Boxes, Lines and Tables ;Text and Typography ;Picture ;Document Construction ;Job Tickets ;Web Layout ;Interactive Layouts ;Collaboration, Single-Sourcing and Color",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7044,
                    "test_name": "Action Script 3.0 Test (Mac Version)",
                    "coverage": "Arrays ;Regular Expressions ;Strings ;Events and Event Handling ;Programming Fundamentals ;Object-oriented programming in ActionScript ;Exception and Error Handling ;Working with XML and E4X ;Working with dates and time",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7047,
                    "test_name": "Macromedia Flash 8 Test (Mac Version)",
                    "coverage": "Architecture and Interface ;Design and Animation ;Actionscripting ;Sound and Output",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7049,
                    "test_name": "Adobe Flash CS4 Test (Mac Version)",
                    "coverage": "Action Script ;Symbols and Assets ;Timelines and Animation ;Sound and Video ;Imported Artwork and Text ;Editing Artwork and 3d graphics ;Publishing,Exporting and Filters ;Managing Documents,Workspace and Screens",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7050,
                    "test_name": "German Sentence Structure Test",
                    "coverage": "SATZARTEN ;SATZTEILE ;GLIEDS&#196;TZE ;PHRASEN ;MODIFIKATOREN ;JUNKTOREN & BINDEW&#214;RTER ;STRUKTUR I: PARALLELISMUS ;STRUKTUR II: KONGRUENZ ;STRUCTURE III: FALSCH EINGESETZTE MODIFIKATOREN",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7051,
                    "test_name": "German Grammar Test",
                    "coverage": "EINSATZ VON PRONOMEN ;PRONOMEN UND IHRE BEZUGSW&#214;RTER ;ZEITEN ;SUBJEKT-VERB-GEF&#252;GE ;ADJEKTIVE, ADVERBIEN, PARTIKELN ;VERGLEICHSFORMEN ;SYNTAX & WORTWAHL ;WORTARTEN & SATZGLIEDER",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7052,
                    "test_name": "Spanish Grammar Test",
                    "coverage": "USO DE PRONOMBRES ;CONCORDANCIA ENTRE PRONOMBRE Y ANTECEDENTE ;TIEMPOS VERBALES ;CONCORDANCIA ENTRE SUJETO Y VERBO ;MODIFICADORES ;COMPARACIONES ;ELECCI&#211;N DE LENGUAJE Y VOCABULARIO ;SINTAXIS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7053,
                    "test_name": "Italian Grammar Test",
                    "coverage": "USO DEI PRONOMI ;CONIUGAZIONI VERBALI ;AVVERBI ;CONGIUNZIONI ;AGGETTIVI ;COMPARATIVI E SUPERLATIVI ;APOSTROFO, ELISIONE, TRONCAMENTO",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7054,
                    "test_name": "Italian Sentence Structure Test",
                    "coverage": "SINTASSI DELLA FRASE COMPLESSA ;MODI E TEMPI DELLA FRASE SUBORDINATA ;DISCORSO DIRETTO E DISCORSO INDIRETTO ;FUNZIONI DELLE CONGIUNZIONI ;VERBI SOSTANTIVATI",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7055,
                    "test_name": "French Sentence Structure Test",
                    "coverage": "CATEGORIE DES MOTS ;FONCTIONS ;PROPOSITIONS ;CONJONCTIONS ET CONNECTEURS ;SYNTAXE DES MODES ET DES TEMPS ;VERBES PRONOMINAUX ;FORME PASSIVE / FORME ACTIVE ;DISCOURS DIRECT ET INDIRECT ;SYNTAXE DE LA PHRASE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7056,
                    "test_name": "French Grammar Test",
                    "coverage": "USAGE DES PRONOMS ;ACCORDS ;CONJUGAISON ;ACCORD DU PARTICIPE PASS&#201; ;TEMPS DES VERBES ;ADVERBES ;COMPARAISONS ;REGISTRES DE LANGUE ;SYNTAXE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7057,
                    "test_name": "Italian Proofreading Skills Test",
                    "coverage": "SEGNI DI INTERPUNZIONE ;GRAMMATICA E SUO UTILIZZO ;USO DEI NUMERI ;ESERCIZI DI CORREZIONE TESTO ;ESERCIZI DI TRASCRIZIONE TESTO",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7060,
                    "test_name": "Spanish Spelling Skills Test",
                    "coverage": "Ortograf&#237;a",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7061,
                    "test_name": "German Vocabulary Skills Test",
                    "coverage": "HOMOPHONE ;H&#196;UFIG VERWECHSELTE W&#214;RTER ;ANTONYME ;SYNONYME ;DEFINITIONEN ;ABGELEITETE BEDEUTUNGEN UND UMSCHREIBUNGEN",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7063,
                    "test_name": "Italian Spelling Skills Test",
                    "coverage": "Ortografia",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7064,
                    "test_name": "French Spelling Skills Test",
                    "coverage": "Orthographe",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7067,
                    "test_name": "German Word Usage Test",
                    "coverage": "WORTGEBRAUCH ;WORTBEDEUTUNG ;ABSTUFUNGEN DER BEDEUTUNG ;PR&#196;POSITIONEN",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7068,
                    "test_name": "Italian Vocabulary Skills Test",
                    "coverage": "OMOGRAFIA ;ANTONIMIA ;SINONIMIA ;DEFINIZIONI ;SIGNIFICATI DA CONTESTO",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7069,
                    "test_name": "Symbian Platform Python Test",
                    "coverage": "Graphical User Interface ;Application Building ;SMS Inbox ;Sound, Interactive Graphics and Camera ;Data Handling ;Mobile Networking ;Symbian Platform",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7070,
                    "test_name": "Drupal 6.14 Test",
                    "coverage": "Advanced Features  ;Interface ;SEO ;Install and Upgrade ;Content ;Admin ;Concept ;Basic Features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 7071,
                    "test_name": "Knowledge of YAML Test",
                    "coverage": "YAML Basics and Features ;YAML Characters and Syntax Primitives ;Processing YAML Information ;YAML Nodes",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7072,
                    "test_name": "French Vocabulary Skills Test",
                    "coverage": "HOMOPHONES ;PARONYMES ;ANTONYMES ;SYNONYMES ;D&#201;FINITIONS ;SIGNIFICATION CONTEXTUELLE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7073,
                    "test_name": "Manufacturing Design Test",
                    "coverage": "Stress and strain concentrations ;Rivets and riveted joints ;Shafts ;Screws and Bolts ;Welded joints ;Keys and couplings ;Belts, Ropes and Chains ;Gears ;Springs and Bearings",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 7074,
                    "test_name": "Spanish Vocabulary Skills Test",
                    "coverage": "HOM&#211;FONOS ;PALABRAS COM&#218;NMENTE CONFUNDIDAS ;ANT&#211;NIMOS ;SIN&#211;NIMOS ;DEFINICIONES ;INFERENCIAS DE SIGNIFICADO",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7075,
                    "test_name": "Structural Analysis Test",
                    "coverage": "Building Frames ;Unsymmetrical bending and elementary theory of elasticity ;Bending of curved bars ;Arches ;Statically indeterminate structures ;Cables, Frames and Suspensions ;Rolling load and circular plates ;Structural methods ;Strain energy analysis and tension co-efficients",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 7077,
                    "test_name": "French Proofreading Skills Test",
                    "coverage": "PONCTUATION ;GRAMMAIRE & USAGE ;USAGE DES CHIFFRES ;BIBLIOGRAPHIE ;INDEXATION ;CORRECTION POUR LA CONSISTANCE ET LA PR&#201;CISION",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7079,
                    "test_name": "Mechanical Engineering Test",
                    "coverage": "Production Management ;Engineering mechanics ;Strength of materials ;Mechanics of metal cutting ;Machine design ;Theory of machines ;Combustion engines ;Thermodynamics ;Workshop Technology ;Mechanical Engineering",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7080,
                    "test_name": "Adobe Illustrator CS4 Test (Mac Version)",
                    "coverage": "Painting ;Reshaping Objects ;Type ;Working with Color and Drawing ;Selecting Objects and 3D Objects ;Importing, Exporting and Saving Files ;Creating Special Effects and Using Graph ;Web Graphics and Automating Tasks",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7081,
                    "test_name": "Italian Word Usage Test",
                    "coverage": "USO DEI VOCABOLI ;SIGNIFICATO DELLE PAROLE ;SFUMATURE DI SIGNIFICATO ;LOCUZIONI AVVERBIALI",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7082,
                    "test_name": "Dreamweaver CS3 Test (Mac Version)",
                    "coverage": "CSS ;Workspace ;Creating and Managing Sites ;Laying Out Pages With HTML and Page Code ;Adding Contents To Pages ;Linking And Previewing ;Template ;Working With XML Data & Database ;Spry Pages ;Assets and Libraries and Keyboard Shortcuts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7083,
                    "test_name": "German Proofreading Skills Test",
                    "coverage": "ZEICHENSETZUNG ;GRAMMATIK ;SCHREIBWEISE VON ZAHLEN ;INDEXIERUNG ;KORREKTURLESEN IN BEZUG AUF KONTINUIT&#196;T UND FEHLERFREIHEIT ;ZITATE UND QUELLENBEZ&#220;GE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7084,
                    "test_name": "Civil Engineering Test",
                    "coverage": "Soil mechanics ;Building materials ;Structural design ;Surveying ;Construction of metallic structures ;RCC Design ;Concrete Technology ;Hydrology and Irrigation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7085,
                    "test_name": "French Word Usage Test",
                    "coverage": "USAGE DES MOTS ;SIGNIFICATION ;NUANCES DE SENS ;PR&#201;POSITIONS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7086,
                    "test_name": "Spanish Word Usage Test",
                    "coverage": "USO DEL LENGUAJE ;SIGNIFICADO DE PALABRA ;MATICES DE SIGNIFICADO ;PREPOSICIONES",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7088,
                    "test_name": "Spanish Proofreading Skills Test",
                    "coverage": "PUNTUACI&#211;N ;GRAM&#193;TICA Y USO DE LA LENGUA ;USO DE LOS N&#218;MEROS ;DOCUMENTACI&#211;N ;&#205;NDICES ;CORRECCI&#211;N DE COHERENCIA Y EXACTITUD",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 7089,
                    "test_name": "U.S. English Proofreading Skills Test (AP Style)",
                    "coverage": "Punctuation ;PROOFREADING FOR CONSISTENCY & ACCURACY ;NUMBER USAGE ;Capitalization ;ABBREVIATIONS ;SPELLING, GRAMMAR AND USAGE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7090,
                    "test_name": "U.S. English AP Style Editing Skills Test (For Writing Professionals)",
                    "coverage": "VERB AND TENSE ERRORS ;GRAMMAR AND USAGE ERRORS ;PUNCTUATION ERRORS ;STYLE ERRORS ;WORD CHOICE & SPELLING ERRORS ;AGREEMENT & PARALLELISM ERRORS ;MODIFIER & COMPARISON ERRORS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7091,
                    "test_name": "English To Danish Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7092,
                    "test_name": "English To Arabic Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7094,
                    "test_name": "English to Japanese Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7095,
                    "test_name": "Microsoft PowerPoint 2010 Test",
                    "coverage": "Interface and Accessibility ;File Management ;Slides and Slide Masters ;Creating and Delivering Presentations ;Working with Images and Graphics ;Animations, Transitions and Multimedia ;SmartArt, Tables and Charts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7096,
                    "test_name": "Knowledge of Google SketchUp Pro 7 Skills Test",
                    "coverage": "User Interface ;Principal Tools ;Common Tasks ;Model Settings and Managers ;Drawing Tools ;Camera and Navigation Tools ;Construction Tools ;Entities and Components ;Style Builder and LayOut ;Sandbox Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7097,
                    "test_name": "Knowledge of Microsoft SharePoint Workspace 2010 Skills Test",
                    "coverage": "Tools ;General Features ;Workspaces ;Communications ;Workspace Management ;Synchronization and Accessibility ;Office Integration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7098,
                    "test_name": "English To Dutch Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7099,
                    "test_name": "English To Swedish Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7100,
                    "test_name": "English To Filipino (Tagalog) Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7102,
                    "test_name": "Test of Knowledge of General JavaScript Skills",
                    "coverage": "Events ;CSS ;Function ;AJAX ;Core ;DOM ;Object ;BOM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7103,
                    "test_name": "English To Brazilian Portuguese Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7104,
                    "test_name": "Knowledge of Mootools Skills Test",
                    "coverage": "Utilities ;Plugins ;Core ;Native Object ;Elements ;Class ;Fx ;Request",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 7106,
                    "test_name": "English To European Portuguese Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7107,
                    "test_name": "Google App Engine Test",
                    "coverage": "Google App Engine Basics ;Google App Engine Services(API) ;Google App Engine Configuration ;Google App Engine Tools ;Google App Engine supported programming languages and SDK",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7108,
                    "test_name": "Microsoft Access 2010 Test",
                    "coverage": "Queries ;Access Database ;Security and Privacy ;Access Features ;File Management ;Access Services ;Designing applications ;Access Customization ;Macros and Modules",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7112,
                    "test_name": "English To Korean Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7113,
                    "test_name": "English To Mandarin Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7117,
                    "test_name": "Knowledge of Box.net Skills Test",
                    "coverage": "Box.net Workspace & Features ;OpenBox Applications and OpenBox Actions ;Box.net Authentication ;Box.net Business Admin Console",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7118,
                    "test_name": "Knowledge of Microsoft Silverlight Skills Test",
                    "coverage": "Silverlight Framework ;Silverlight Controls ;Graphics, Animation, and Media in Silverlight ;Silverlight Properties, Methods, and Events ;Networking In Silverlight ;Debugging, Testing, and Deploying Silverlight Applications ;Performance and Security of Silverlight Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7119,
                    "test_name": "Knowledge of Prototype Skills Test",
                    "coverage": "Basic ;AJAX ;Class ;Collection ;DOM ;Event ;Script.aculo.us - Basic Effects ;Script.aculo.us - Other Techniques",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7120,
                    "test_name": "U.S. Culture and Etiquette Test",
                    "coverage": "US Office Skills ;US Workplace Terminology ;US Social Customs ;US Food and Drink ;US Domestic Travel ;US Everyday Phrases ;US Politics ;US Sports",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 7121,
                    "test_name": "Knowledge of Vectorworks 2010 Skills Test",
                    "coverage": "Vectorworks Fundamentals ;Vectorworks RenderWorks ;Vectorworks Landmark ;Vectorworks Architect ;Vectorworks Spotlight ;Vectorworks Designer",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7131,
                    "test_name": "Knowledge of SAP ABAP Test",
                    "coverage": "Performance Optimization ;Concepts and Components ;ABAP Types and Data Objects ;Service Oriented Architecture ;SAP Solution Manager ;SQL / Database",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7140,
                    "test_name": "Microsoft Outlook 2010 Test",
                    "coverage": "Advanced Features of Microsoft Outlook 2010 ;Outlook 2010 Basics ;Business Contact Manager for Outlook 2010 ;File Management and Security in Microsoft Outlook 2010",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7143,
                    "test_name": "Knowledge of Symbian C++ Test",
                    "coverage": "Graphical User Interface ;Application Building ;Data Handling ;Symbian Platform ;Symbian API ;Carbide.c++ Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7145,
                    "test_name": "Knowledge of Skype Development Test",
                    "coverage": "Skype Public API and Skype4COM ;Skype Basics and Features ;Skype security",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7153,
                    "test_name": "Knowledge of Google Web Toolkit Skills Test",
                    "coverage": "Google Web Toolkit Basics ;Building GWT Applications (user interfaces, internationalization & accessibility) ;Testing a GWT application (using JUnit) and Deploying a GWT application ;Optimize a GWT Application ;Google Web Toolkit API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7154,
                    "test_name": "HTML 5 Test",
                    "coverage": "HTML 5 Elements and attributes ;HTML 5 Events ;HTML 5 syntax ;HTML 5 Web application APIs ;Loading HTML 5 Web pages ;HTML DOM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                },
                {
                    "test_id": 7156,
                    "test_name": "English To Russian Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7157,
                    "test_name": "Knowledge of Microsoft Expression Web 4 Skills Test",
                    "coverage": "Basics of Microsoft Expression Web 4.0 ;Microsoft Expression Web 4.0 User Interface ;CSS and Web Layouts in Microsoft Expression Web 4.0 ;Multimedia in Microsoft Expression Web 4.0 ;Previewing and Publishing in Microsoft Expression Web 4.0",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7165,
                    "test_name": "Final Cut Pro 7 Skills Test",
                    "coverage": "Final Cut Pro 7.0 Basic and interaction with other application ;Basic interface of Final Cut Pro 7.0 ;Effects, Transitions, Tools and Editing in Final Cut Pro 7.0 ;Working with videos, images and audios in Final Cut Pro 7.0",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mac Applications"
                },
                {
                    "test_id": 7169,
                    "test_name": "Knowledge of Google Wave Skills Test",
                    "coverage": "Google Wave Basic Features ;Google Wave Access Permissions ;Manage and Update Google Waves ;Google Wave Gadgets and Bots ;Google Wave API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7170,
                    "test_name": "Knowledge of WordPress 3.0 Skills Test",
                    "coverage": "Install & Upgrade ;Theme ;SEO ;Plug-ins & Widgets ;Features, Performance and Security ;Administration, Dashboard and Settings ;Users and Roles ;Post, Page, Custom Content Types, Taxonomies, and Fields ;Code",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7172,
                    "test_name": "Knowledge of Windows Mobile Skills Test",
                    "coverage": "New Features in Windows Mobile ;Development Tools for Windows Mobile ;Delivering and Managing Applications on a Windows Mobile Powered Device ;Windows Mobile Shell, GWES, and User Interface ;Voice over IP Phone Services ;Gestures API in Windows Mobile 6.5 ;Developing Widgets for Windows Mobile 6.5 ;Applications and Services in Windows Mobile",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7176,
                    "test_name": "Knowledge of Microsoft Office Skills Test",
                    "coverage": "Microsoft Word 2010 ;Microsoft Excel 2010 ;Microsoft Powerpoint 2010 ;Microsoft Outlook 2010",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7181,
                    "test_name": "SAP Netweaver Skills Test",
                    "coverage": "SAP Netweaver Test",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7193,
                    "test_name": "Knowledge of Camtasia Skills Test",
                    "coverage": "Camtasia Recorder ;Edit and Add Effects to Your Video in Camtasia ;Produce and Share a Video in Camtasia",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7194,
                    "test_name": "Knowledge of Ruby Skills Test",
                    "coverage": "Variables and Operators ;Features and Basics ;Conditional Statements, Loops and Methods ;Strings and Collections ;Ruby Advanced",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7196,
                    "test_name": "Knowledge of Windows Phone 7 Skills Test",
                    "coverage": "Multimedia and controls ;Silverlight for Window Phone ;XNA Game Studio 4.0 ;Windows phone 7 fundamentals and Features ;Design and Gesture control ;Web Services and Class libraries",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7197,
                    "test_name": "Critical Reading Skills Test",
                    "coverage": "Critical Reading",
                    "total_questions": 11,
                    "duration": 60,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 7198,
                    "test_name": "Knowledge of Magento Skills Test",
                    "coverage": "Product ;Order & Payment ;Category ;Attribute ;Price & Promotion ;Tax ;Shipping Method ;Installation, Upgrade, Maintain ;Administration & Customer Support",
                    "total_questions": 60,
                    "duration": 60,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 7201,
                    "test_name": "Content Writing Skills Test",
                    "coverage": "Spellings ;Grammar ;Copyright Issues ;COMMONLY CONFUSED WORDS ;Content Organization and Style of Writing ;SEO in content writing ;Research Techniques",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 7204,
                    "test_name": "Knowledge of SQL Server 2008 Skills Test",
                    "coverage": "SQL Server 2008 Basics ;Data Compression and Resource Governor ;Permission and Security Features ;SQL Server 2008 sqlcmd Utility ;SQL Server 2008 Data Types ;SQL Server 2008 Auditing ;SQL Server 2008 Transact SQL ;SQL Server 2008 Constraints ;SQL Server 2008 Queries",
                    "total_questions": 60,
                    "duration": 60,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 7211,
                    "test_name": "Knowledge of VirtueMart Test",
                    "coverage": "VirtueMart Shopping Cart Fundamentals ;VirtueMart Shopping Cart Settings ;VirtueMart Product and Category Management ;VirtueMart Template and Module",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7213,
                    "test_name": "Knowledge of WordPress 3.1 Skills Test",
                    "coverage": "Install & Upgrade ;Theme ;SEO ;Plug-ins & Widgets ;Features, Performance and Security ;Administration, Dashboard and Settings ;Users and Roles ;Post, Page, Custom Content Types, Taxonomies, and Fields ;Code",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7214,
                    "test_name": "Knowledge of Ning Skills Test",
                    "coverage": "Authentication and Visibility using NING API ;Request and Response features using NING API ;Ning OpenSocial API ;Ning MetaWeblog API ;Ning Features and Customization",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7221,
                    "test_name": "Paypal Integration for Web Skills Test",
                    "coverage": "PayPal Payment Processing Basics ;PayPal Sandbox ;NVP API and SOAP API ;Express Checkout ;PayPal Order Management ;Website Payments Standard Integration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7222,
                    "test_name": "Knowledge of Hibernate 3.0 Skills Test",
                    "coverage": "Architecture and Configuration ;Hibernate Query Language (HQL) ;APIs ;Object-Relational mapping ;Transactions and Concurrency",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 7274,
                    "test_name": "Knowledge of Windows 7 Skills Test",
                    "coverage": "The Windows 7 Basics ;The Windows 7 Computer Management & Networking ;The Windows 7 Entertainment & Accessories ;The Windows 7 System and Security",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 7612,
                    "test_name": "English to Traditional Chinese Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7627,
                    "test_name": "English to Simplified Chinese Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 7658,
                    "test_name": "Economics Fundamentals Test",
                    "coverage": "Basic Economics ;Microeconomics ;Macroeconomics ;International economics",
                    "total_questions": 25,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 7668,
                    "test_name": "Adobe Photoshop CS6 Test",
                    "coverage": "Filters ;Working with Text ;Special Effects ;Working with Colors ;Photoshop Basics ;Working with Layers ;Masking ;Photoshop Fundamentals ;Selection and Transformations ;Image Adjustments",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7672,
                    "test_name": "Adobe Illustrator CS6 Test",
                    "coverage": "Drawing ;Reshaping Objects ;Web Graphics ;Special Effects ;Illustrator Basics ;Perspective Grid ;Symbols",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7681,
                    "test_name": "Adobe Flash Professional CS5 Test",
                    "coverage": "Action Script ;Timelines and Animation ;Working with Layers ;Flash Basics ;Working with Videos ;Working with Files ;Symbols and Filters ;Working with Data and Text ;Publish for AIR",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7690,
                    "test_name": "Adobe Fireworks CS6 Test",
                    "coverage": "Animation ;Working with Text ;Working with Bitmaps ;Special Effects ;Fireworks Basic ;Interactivity ;Fireworks Basics ;Working with Vectors",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7700,
                    "test_name": "Adobe Flash Professional CS5.5 Test",
                    "coverage": "Action Script ;Timelines and Animation ;Working with Layers ;Flash Basics ;Working with Videos ;Working with Files ;Symbols and Filters ;Working with Data and Text ;Publish for AIR",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7718,
                    "test_name": "Ruby on Rails 3 Test",
                    "coverage": "Basic Concepts ;Advanced Concepts ;Ruby Programming Concepts ;Database Handling ;Views ;Testing and Validation ;Controllers ;Models",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7731,
                    "test_name": "Engineering Aptitude Test",
                    "coverage": "Logical Reasoning ;English Usage ;Quantitative Ability",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7738,
                    "test_name": "iOS 5 Programming Skills Test",
                    "coverage": "Objective-C ;User Experience ;X-Code ;iOS 5 ;Core Data ;AVFoundation ;Gaming and Animation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7740,
                    "test_name": "Android 4.2 Skills Test",
                    "coverage": "User Interface ;Android Application Development Basics ;Android Storage and Database ;Internet and Networking ;Open GL ;Android Media and Animation ;Android Api ;Android Renderscript Computation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7742,
                    "test_name": "iOS 6 Programming Skills Test",
                    "coverage": "User Experience ;X-Code ;iOS6 ;Objective C ;Multimedia And Gaming",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7752,
                    "test_name": "Commercial Pilot Technical Skills Test",
                    "coverage": "Air Navigation ;Air Regulations ;Air Regulation ;Aircraft, instruments and Engines ;Aviation Meteorology",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7759,
                    "test_name": "ASP.NET MVC Skills Test",
                    "coverage": "Security ;Deployment ;URL Routing and areas ;Authentication & Authorization ;Language features ;Views, Model and controller ;Jquery & Ajax ;MVC Pattern ;MVC Basics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 7774,
                    "test_name": "Commercial Pilot Skills Test",
                    "coverage": "Aviation Meteorology ;General aviation ;Air frames ;Airplane Engines ;Avionics ;Electrical ;POF (principles of flight) ;Auxiliary power unit ;Air Systems ;Communications and Radar ;Aircraft System Flight Regulation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7812,
                    "test_name": "Django Skills Test",
                    "coverage": "Basics of Django ;Views and URLconfs,Templates and Models ;Deploying Django and Caching ;The Django Admin Site ;Forms, Sessions, Users, and Registration ;Internationalization and Security ;Integrating with Legacy Databases and Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7814,
                    "test_name": "Dreamweaver CS6 Test",
                    "coverage": "File Management ;Dreamweaver Basics ;Layout and Design ;Mobile and Multiscreen ;CSS and linking ;Coding",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7818,
                    "test_name": "Instrumentation Engineering Skills Test",
                    "coverage": "Basics of circuits and measurement system ;Transducers, Mechanical Measurement and Industrial Instrumentation ;Digital Electronics ;Analog Electronics ;Signals, System and Communication ;Electrical and Electronic measurements ;Control system and process control ;Analytical, Optical and Biomedical Instrumentation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7822,
                    "test_name": "Xcode 4.x Test",
                    "coverage": "Introduction to Xcode ;Building, Running and Debugging Apps ;Starting and Configuring Projects ;Editing UI and Source Code ;Managing Devices and Saving/Reverting Changes to Files and Projects ;Advanced Xcode",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mac Applications"
                },
                {
                    "test_id": 7825,
                    "test_name": "Basic Algebra Skills Test",
                    "coverage": "Introduction to Algebra ;Dealing with Signed and Unsigned Numbers ;Reciprocals and Solving Brackets ;Linear Equations ;Inequalities and Absolute Values ;Exponents,Common Factors and Distributive Property ;Binomials,Trinomials and Polynomials ;Algebraic Fractions ;Radicals ;Complex Numbers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7830,
                    "test_name": "Dreamweaver CS6 Test (Mac Version)",
                    "coverage": "File Management ;Dreamweaver Basics ;Layout and Design ;Mobile and Multiscreen ;CSS and linking ;Coding",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7833,
                    "test_name": "Aircraft Loads and Trim Executives Aptitude Test",
                    "coverage": "Planning ;Logical Ability ;Perceptual Skills ;Mathematics Skills ;Speed analysis and accuracy ;Numerical Ability and Simple Calculation ;Basic Physics ;English Skills",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7835,
                    "test_name": "Mobile Game development using Android OS",
                    "coverage": "Introduction to Android ;Introduction to Eclipse ;Creating Application ;Components of Android Application ;Handling Text and Display in Android games ;Handling images in Android Application ;Handling Text and display in Android Application ;Handling images in Android Games ;Handling Sound Media ;Handling Bitmap Font and OpenGL",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7839,
                    "test_name": "Twitter Account Management Skills Test",
                    "coverage": "Twitter Basics, Profile and Account Settings ;Tweets and Personal Messages ;Twitter Troubleshooting ;Searching, Finding and Following People on Twitter ;Twitter Rules, Policies and Violations ;Twitter Apps, SMS & Mobile ;Advertising on Twitter",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 7848,
                    "test_name": "ASP.Net 4.0 Skills Test",
                    "coverage": "Memory Management ;SQL Server Programming Constructs ;ASP.NET Basics ;ASP.NET Events ;Advanced ASP.NET Concepts ;Advanced Topics ;Database Programming and Validation ;ADO.net ;DataBinding, Web Controls, User Control, Custom Controls ;SQL Server Queries",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7849,
                    "test_name": "Business Statistics Skills Test",
                    "coverage": "Understanding Business Data ;Organizing and Presenting your Business Data ;Measures of Central Tendency and Dispersion ;Introduction to Probability ;Research Methods in Business ;Sampling Methods in Business Research ;Testing your Business Hypothesis ;Correlations between Business Variables ;Linear Regression Analysis &#8211; Part 1 ;Linear Regression Analysis &#8211; Part 2 ;Making Effective Comparisons through Analysis of Variance (ANOVA)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 7865,
                    "test_name": "UK Academic Writing Test",
                    "coverage": "Sentence Structure ;Verb and Verb Tenses ;Sentence Types and Forms ;Sentence Formation (Verb) ;Parts of Speech ;Sentences, Clauses, and Phrases",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7877,
                    "test_name": "Conversion Calculation Test",
                    "coverage": "Simple and Compound Interest ;Time and Ages ;Distance and Speed ;Weight, Area and Volume",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 7917,
                    "test_name": "Symfony 1.4 Skills Test",
                    "coverage": "Web services, AJAX, and Plugins ;Introduction to Symfony 1.4 ;Deployment and Miscellaneous ;Architecture and Model overview ;Controller, View, and Model layer ;Unit and Functional testing ;Configuring Symfony ;Installation, Basics of page creation and execution ;Forms, links and routing ;Emails and Caching",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7923,
                    "test_name": "Investment and Financial Planning Skills Test",
                    "coverage": "Mutual Funds ;General Insurance ;Life Insurance ;Equity/Commodities",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 7928,
                    "test_name": "Mathematics Skills Test",
                    "coverage": "Probability ;Permutations and Combinations ;Complex Numbers ;2D Coordinate Geometry ;Sequences and Series ;Rational Numbers ;Commercial Mathematics ;Trigonometry",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7943,
                    "test_name": "Software Development Life Cycle Test",
                    "coverage": "Miscellaneous ;Coding and testing ;History and Introduction ;SDLC Phases and Models ;Software design concepts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 7957,
                    "test_name": "Bluetooth Technology Skills Test",
                    "coverage": "Packets, Piconet and Scatternet ;Connection Establishment and Pairing ;Hardware Specifications and Transmission Characteristics ;Applications and advantages of Bluetooth technology ;Bluetooth Profiles & Protocols ;Security and Power Levels in Bluetooth ;Introduction to Bluetooth",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7959,
                    "test_name": "Software Engineering Skills Test",
                    "coverage": "Testing ;Software design concepts ;Software Requirement analysis and Specifications ;Coding, Debugging, Integration and System testing ;Introduction to Software Engineering and UML ;Software life cycle and Models",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 7961,
                    "test_name": "Front Office Management Skills Test",
                    "coverage": "Front Office ;Rooms and Meal Plans ;Reservation ;Registration ;Hotel Entrance, Lobby and Front Office ;Techniques Used to Increase Business ;Responsibilities and Communication ;Activities During Guest Stay",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 7963,
                    "test_name": "iOS App development using Apple Xcode 4.x Skills Test",
                    "coverage": "Using Xcode 4.x Interface Builder & its Objects ;Introduction to iOS App Development with Xcode 4.x ;Building iOS App Interface in Xcode 4.x ;Submitting Apps to Apple App Store ;Programming iOS App in Xcode 4.x",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 7964,
                    "test_name": "Asp.Net with J# Test",
                    "coverage": "Basic Concepts ;Fundamentals ;Security ;Memory Management ;OOPS  ;Event Handling ;Advanced Techniques ;CLR ;Configuration ;Advanced Topics ;Language Basics ;Database Programming and Validation ;ADO.net ;DataBinding, Web Controls, User Control, Custom Controls ;Framework Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 7966,
                    "test_name": "Microsoft Excel 2013 Skills Test",
                    "coverage": "Fundamentals ;Managing Worksheets ;Web based Co-authoring and Streamlined Communications ;Microsoft Excel 2013 Advanced Features ;Documents Security, Privacy and Recovery ;Analyzing Data - Pivot Charts and PivotTables ;Protection and security in Excel ;Functions and Formulas",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 7967,
                    "test_name": "C# 4.0 Skills Test",
                    "coverage": "Basic Concepts ;Operators ;Object Oriented Concepts ;Classes ;Advanced Concepts ;Framework Fundamentals ;ADO.net and CLR ;Exception Handling and Flow Control",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 7969,
                    "test_name": "WCF 4.0 Skills Test",
                    "coverage": "WCF",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 7970,
                    "test_name": "Microsoft Silverlight 4.0 Skills Test",
                    "coverage": "Silverlight Framework ;Silverlight Controls ;Graphics, Animation, and Media in Silverlight ;Silverlight Properties, Methods, and Events ;Networking In Silverlight ;Debugging, Testing, and Deploying Silverlight Applications ;Performance and Security of Silverlight Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7971,
                    "test_name": "Pilot Aptitude Test",
                    "coverage": "Logical Ability ;POF (principles of flight) ;Mathematics Skills ;Speed analysis and accuracy ;English Skills",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7972,
                    "test_name": "English for Business Skills Test",
                    "coverage": "English Usage (Words and Phrases) ;Business Writing ;Spelling",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7973,
                    "test_name": "Advertisement Writing Test",
                    "coverage": "Advertising Basics ;Copyright Issues ;Poetry ;Other Types of Writing ;Content Organization and Style of Writing",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 7974,
                    "test_name": "Book Writing Skills Test",
                    "coverage": "Non-fiction ;Technical Writing Tools and Software ;Fiction I ;Microsoft Word 2010 Fundamentals ;Parts of Speech",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "English Language"
                },
                {
                    "test_id": 7976,
                    "test_name": "Copywriters Skills Test",
                    "coverage": "Copyright Issues ;Other Types of Writing ;Technical Writing Tools and Software ;Microsoft Word 2010 Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Writing and Publishing"
                },
                {
                    "test_id": 7978,
                    "test_name": "Airlines Space Control Executive Skills Test",
                    "coverage": "Logical Ability ;Communication Skills ;Customer Service ;Air Navigation ;Aircraft, instruments and Engines ;Air Systems ;Aircraft System Flight Regulation ;Microsoft Office 2010",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7980,
                    "test_name": "Freelance Writing Test",
                    "coverage": "Writing Style For the Web ;Targeting Your Audience ;Dos and Don'ts of Online Writing and Blogging ;Other Types of Writing ;Microsoft Word 2010 Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Writing and Publishing"
                },
                {
                    "test_id": 7981,
                    "test_name": "Letter Writing Skills Test",
                    "coverage": "Sentence Structure ;Business Writing ;Technical E-mail Etiquette ;Microsoft Word 2010 Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Writing and Publishing"
                },
                {
                    "test_id": 7985,
                    "test_name": "Photoshop CC Skills Test",
                    "coverage": "Filters ;Working with Text ;Special Effects ;Working with Colors ;Photoshop Basics ;Working with Layers ;Masking ;Photoshop Fundamentals ;Selection and Transformations ;Image Adjustments ;Advance features",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7988,
                    "test_name": "Cabin Crew Etiquette Test",
                    "coverage": "Cabin Crew Etiquette",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 7989,
                    "test_name": "Newsletter Writing Test",
                    "coverage": "Business Writing ;Technical Writing Tools and Software ;Technical E-mail Etiquette ;Business Report Writing I: Purpose and Content ;Microsoft Word 2010 Fundamentals ;Content Organization and Style of Writing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Writing and Publishing"
                },
                {
                    "test_id": 7990,
                    "test_name": "Web Content Writing Test",
                    "coverage": "Copyright Issues ;Optimizing Content for Search Engines ;Blog Writing Skills ;Writing Style For the Web ;Dos and Don'ts of Online Writing and Blogging ;Plagiarism on the Web ;Content Organization and Style of Writing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Writing and Publishing"
                },
                {
                    "test_id": 7993,
                    "test_name": "Adobe Flash Professional CC Skills Test",
                    "coverage": "Advanced Features  ;Action Script ;Timelines and Animation ;Working with Layers ;Flash Basics ;Working with Videos ;Working with Files ;Symbols and Filters ;Working with Data and Text ;Publish for AIR",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 7999,
                    "test_name": "Microsoft PowerPoint 2013 Test",
                    "coverage": "Working With Objects ;Working with presentation ;Microsoft PowerPoint Basics ;Working with slides ;Working with texts ;PowerPoint Objects ;Animation, Transitions and Effects ;Images, audios and videos",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8000,
                    "test_name": "Data Analysis Skills Test",
                    "coverage": "Data Analyzing Techniques ;Numerical Data Sufficiency ;Graphical Data Interpretation ;Text Data Interpretation ;Analytical Skills ;Understanding Business Data ;Organizing and Presenting your Business Data",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 8005,
                    "test_name": "Adobe Indesign CC Test",
                    "coverage": "Advanced Features  ;Publishing ;Animation ;Typography ;Workspace ;Styles ;Indesign Basics ;Drawing and frames ;Automation and Accessibility",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 8007,
                    "test_name": "Fundamentals of Business Analysis Test",
                    "coverage": "Partnership ;Simple and Compound Interest ;Data Analyzing Techniques ;Understanding Business Data ;Organizing and Presenting your Business Data ;Research Methods in Business",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8009,
                    "test_name": "Business Development Skills Test",
                    "coverage": "Basic Outbound Sales ;Sales Methods ;Sales Management ;Sales Strategy ;Sales Process ;Sales Promotion",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 8013,
                    "test_name": "Adobe Dreamweaver CC Skills Test",
                    "coverage": "Advanced Features  ;File Management ;Dreamweaver Basics ;Layout and Design ;Mobile and Multiscreen ;CSS and linking ;Coding",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 8014,
                    "test_name": "Guest Relations Executive Test",
                    "coverage": "Communication Skills ;Customer Service ;Hotel Guest Relations Executive ;Email and Telephone Etiquette ;Hotel Food, Drinks and Travel",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 8069,
                    "test_name": "Microsoft SharePoint Server 2013 Test",
                    "coverage": "Introduction and overview of SharePoint 2013 ;Tools introduction and Windows Azure ;Building blocks of SharePoint 2013 development ;CSOM, REST APIs and overview of OAuth ;Advanced application development",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 8074,
                    "test_name": "Instrumentation Engineering Test",
                    "coverage": "Engineering Mathematics ;Digital Electronics ;Analog Electronics ;Electrical and Electronic measurements ;Basics of Circuits and Measurement Systems ;Transducers, Mechanical Measurement, and Industrial Instrumentation ;Signals, Systems and Communications ;Control System, Process Control, Analytical, Optical and Biomedical Instrumentation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 8083,
                    "test_name": "Computer Science Engineering Test",
                    "coverage": "Data Structures ;Operating Systems ;Software Engineering ;Algorithms ;Procedural Languages ;Discrete Structures ;Computer Architecture ;Computer Communications and Networks ;Introduction to Modern Database Systems ;Object Oriented Programming ;Internet and Web Development",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 8132,
                    "test_name": "E-mail Writing Skills Test",
                    "coverage": "Vocabulary ;Grammar ;Sentence Completion ;Interpersonal Internet Etiquette ;Technical Internet Etiquette ;Technical E-mail Etiquette ;Interpersonal E-mail Etiquette ;Abbreviations used in e-mails",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Office Skills"
                },
                {
                    "test_id": 8196,
                    "test_name": "Integrity Test",
                    "coverage": "Lack of Commitment, Absenteeism and Tardiness ;Disciplinary Problems, Subversion and Intolerance ;Theft of Company Property, Wasteful Use of Resources and Failure to Share ;Honesty, Trustworthiness and Dependability ;Conscientiousness, Compassion and Empathy ;Caution, Accident Prevention and Mindfulness ;Amiableness, Friendliness and Calmness ;Respect for Senior Managers, Submissiveness and Modesty ;Ability to Cope with Change, Self-Confidence and Self-Belief",
                    "total_questions": 35,
                    "duration": 25,
                    "passing_marks": 60,
                    "category": "Personality Tests"
                },
                {
                    "test_id": 8222,
                    "test_name": "Verbal Ability Mock Test for CAT Preparation",
                    "coverage": "Verbal Ability",
                    "total_questions": 195,
                    "duration": 99,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 8226,
                    "test_name": "Life Coach Aptitude Test",
                    "coverage": "Interpersonal Skills ;Patience ;Self-discipline ;Listening Ability ;Positive Attitude ;Coaching Skills ;Integrity",
                    "total_questions": 30,
                    "duration": 20,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 8239,
                    "test_name": "Quantitative Ability Mock Test for CAT Preparation",
                    "coverage": "Quantitative Ability",
                    "total_questions": 100,
                    "duration": 99,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 8245,
                    "test_name": "Emergency & Disaster Management Skills for Cabin Crew Test",
                    "coverage": "Logical Ability ;Communication Skills ;Customer Service ;Compassion ;Awareness of funeral related terminology ;Awareness of repatriation related terms and concepts ;Guest Relations ;Travel Coordination ;Housekeeping ;Reasoning ;Attention to Details",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Airlines and Aviation"
                },
                {
                    "test_id": 8248,
                    "test_name": "Java 7 Programming Test",
                    "coverage": "Language Fundamentals ;Flow Control ;Operators and Assignments ;Threads ;Exceptions ;Declarations and Access Control ;Objects and Collections ;Inner Classes ;Garbage Collections ;Java.lang Class",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 8306,
                    "test_name": "Knowledge of .Net Framework 4.5 Skills Test",
                    "coverage": "Data Access ;Security ;Caching ;SERVICES ;Core ;Web Apps ;Cloud Apps ;Windows Store Apps ;Windows Phone Apps ;Desktop Apps",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 8308,
                    "test_name": "Facebook Graph API Test",
                    "coverage": "Advanced Features  ;Basics ;Data Manipulation ;Authentication and Publishing ;Public Feed API ;Keyword Insights API ;Chat API ;Handling Errors ;Debugging API Requests ;App Development and Testing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 8318,
                    "test_name": "Dropbox Skills Test",
                    "coverage": "Datastore Basics ;Core API ;Datastore API ;Sync API",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 8334,
                    "test_name": "Android 4.4 Skills Test",
                    "coverage": "Fundamentals ;Administration ;User Interface ;Manifest ;Animation and Graphics ;Media and Camera ;Location and Sensors ;Connectivity ;Text and Input ;Data Storage",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 8354,
                    "test_name": "Magento 1.9 Skills Test",
                    "coverage": "Product ;Order & Payment ;Category ;Attribute ;Price & Promotion ;Installation, Upgrade, Maintain ;Administration & Customer ;Shipping Method and Tax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8368,
                    "test_name": "VISIO 2010 Test",
                    "coverage": "Shapes ;Formatting & Keyboard Shortcuts(windows) ;Flowcharts & General & Network Diagrams ;Data ;Business Diagrams ;Web site Diagrams & Maps & Floor Plans ;Schedule Diagrams ;Database Model Diagrams & File Management ;Setting up Pages & Security ;Inserting Drawings & pages & Customizing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8501,
                    "test_name": "Angular JS",
                    "coverage": "Introduction to AngularJS ;MVC Architecture, Expressions and Directives ;Functions, Controllers and Filters ;Tables, HTML DOM, Modules and Forms ;Events, Validations, Classes, Directives and Services ;Providers, Types, Views and Scopes ;Security, Routing and Ajax",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 8514,
                    "test_name": "Node.js Test",
                    "coverage": "Data Handling ;Debugging and Testing ;Introduction to Node.js ;Node.js and JavaScript ;Packages in Node.js ;Node.Js Core Concepts ;Events and Streams ;Basic Understanding of Express ;Front End Concepts ;Callbacks ;Understanding HTTP",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 8516,
                    "test_name": "Keynote 6.5 Test",
                    "coverage": "Introduction to Keynote ;Creating Tables using Keynote ;Creating Charts Using Keynote ;Themes, Object Builds and Slide Transition ;Adding, Editing and Formatting Text ;Working with presentations using Keynote ;Managing Images, Shapes, and Media in Keynote ;Managing Presentations and Slideshow",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8517,
                    "test_name": "Microsoft Access 2013 Test",
                    "coverage": "Introduction to MS Access 2013 ;Tables in MS Access ;Relationships in MS Access ;Linking External Data in MS Access ;Queries in MS Access ;Analyzing Data in MS Access ;Operators in MS Access",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 8521,
                    "test_name": "Tableau 8 Test",
                    "coverage": "Introduction to Tableau ;Basic Visualization Design ;Connecting to Data Source in Tableau 8 ;Tableau Charts and Maps ;Interacting With Viewers ;Calculated Fields and Table Calculations in Tableau 8 ;Tableau Dashboards ;Tableau Formatting ;Sharing & Distributing Tableau Applications",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 8522,
                    "test_name": "Pentaho Data Integration 5.x Test",
                    "coverage": "Basics of Pentaho Data Integration ;Working with Database, Reading/Writing files ;Big Data, Cloud Services and XML structure ;File management, Data flows, Jobs and Transformations ;Reporting, Visualization tools and Data analytics ;Advance topics (Administrator, security)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 8541,
                    "test_name": "ASP.NET 4.5 Skills Test",
                    "coverage": "Memory Management ;.NET Framework: General ;.NET Framework 4.5: New Features ;ASP.NET 4.5 Web Programming ;ASP.NET 4.5 Web controls ;.NET 4.5 Framework Class Library",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": ".Net Technology"
                },
                {
                    "test_id": 8577,
                    "test_name": "SQL Server 2012 Skills Test",
                    "coverage": "Data Compression and Resource Governor ;Permission and Security Features ;SQL Server 2012 Basics ;SQL Server 2012 sqlcmd Utility ;SQL Server 2012 Auditing ;SQL Server 2012 Data Types ;SQL Server 2012 Queries ;SQL Server 2012 Constraints ;SQL Server 2012 Transact SQL",
                    "total_questions": 60,
                    "duration": 60,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 8605,
                    "test_name": "Business Decision Making (Operations case 1) Test",
                    "coverage": "",
                    "total_questions": 2,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 8606,
                    "test_name": "Business Decision Making (Sales case 1) Test",
                    "coverage": "",
                    "total_questions": 2,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 8612,
                    "test_name": "Business Decision Making (Sales case 2) Test",
                    "coverage": "",
                    "total_questions": 2,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 8613,
                    "test_name": "Business Decision Making (Sales case 3) Test",
                    "coverage": "",
                    "total_questions": 2,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 8614,
                    "test_name": "Business Decision Making (Operations case 2) Test",
                    "coverage": "",
                    "total_questions": 2,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Miscellaneous Certifications"
                },
                {
                    "test_id": 8628,
                    "test_name": "iOS 8 Programming Skills Test",
                    "coverage": "Introduction to iOS 8 ;iOS 8 Advanced Concepts ;User Interface and User Experience ;Introduction to Objective C ;Objective C Classes, Objects and Methods ;X-Code and Apple Swift",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 8664,
                    "test_name": "Hadoop Skills Test",
                    "coverage": "Introduction to Hadoop ;Hadoop and MapReduce ;Hive Concepts ;Pig Concepts ;Hadoop Distributed File System ;YARN ;Hadoop Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 8714,
                    "test_name": "Multiple Virtual Storage (z/OS V2R1)",
                    "coverage": "Introduction to MVS(z/OS&#41; ;Time Sharing Option/Extended ;Interactive System Productivity Facility (ISPF&#41; ;Introduction to JES2 and JES3 ;JCL and NFS ;RACF and Integrated Security Services ;Data management and Distributed file service SMB Administration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 8716,
                    "test_name": "Microsoft Word 2013 Test",
                    "coverage": "Page Layout ;Working with Tables, References and Lists ;Charts ;Working with Graphics ;Macros/Content Controls ;Microsoft Word 2013 Fundamentals",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8775,
                    "test_name": "Apple Swift 2.x Skills Test",
                    "coverage": "Operators ;Collections and Control flow ;Functions, Closures and Enumerations ;Subscripts, Inheritance, Initialization/Deinitialization ;Introduction to Apple Swift and Basics ;Classes, Structures, Properties and Methods ;Advance topics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 8788,
                    "test_name": "Windows Server 2012 Skills Test",
                    "coverage": "Active Directory Management in Windows Server 2012 ;Introduction to Windows Server 2012 ;Group Policy Management in Windows Server 2012 ;Deploying and Updating Windows Server 2012 ;File Services, Monitoring and Auditing in Windows Server 2012 ;Network Policies and Remote Access in Windows Server 2012 ;Managing Accounts and Policies in Windows Server 2012 ;Name Resolution Configuration in Windows Server 2012",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 8843,
                    "test_name": "Leadership Skills Test",
                    "coverage": "Communication Skills ;Ambition ;Intrapersonal ;Interpersonal ;Organizing Ability ;Leadership Skills ;Decision Making ;Planning Skills",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 8860,
                    "test_name": "Microsoft Project 2013 Test",
                    "coverage": "Introduction ;Task Basics ;Resource Basics ;Task Resource Assignments ;Fine-Tuning Tasks ;Fine-Tuning Resources ;Finalizing the Plan ;Tracking Progress ;Viewing and Reporting Progress ;Detailed Progress Tracking ;Consolidating Resources and Projects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 8876,
                    "test_name": "Teacher Aptitude Test",
                    "coverage": "Communication Skills ;Ingenuity ;Curiosity ;Helpful Attitude ;Interpersonal Skills ;Patience ;Leadership Skills",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 8880,
                    "test_name": "QuickBooks Pro 2016 Test",
                    "coverage": "Accounts Receivable ;Accounts Payable ;Payroll ;Banking ;Reports ;QuickBooks Overview ;Items ;Sales Tax ;Journal Entries ;Year-End Procedures",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8915,
                    "test_name": "Supply Chain Management Test",
                    "coverage": "Fundamentals ;Distribution ;Warehousing and Inventory Concepts ;Principle and Objectives ;Market Forecasting ;Planning and Sourcing ;Manufacturing and Delivering ;Coordination in Supply Chain management ;Metrics used in Supply Chain management ;IT, Applications & problem addressed ;Third Party Warehouse Management ;Inventory management and Control",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 8916,
                    "test_name": "Financial Analyst Aptitude Test",
                    "coverage": "Numerical Ability  ;Communication Skills ;Tough-mindedness ;Ingenuity ;Problem Solving ;Attention to Detail ;Organizing Ability ;Logical and Analytical Skills",
                    "total_questions": 46,
                    "duration": 46,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8925,
                    "test_name": "WordPress 4.1 Skills Test",
                    "coverage": "Install & Upgrade ;Theme ;SEO ;Plug-ins & Widgets ;Features, Performance and Security ;Administration, Dashboard and Settings ;Users and Roles ;Post, Page, Custom Content Types, Taxonomies, and Fields ;Code",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 8927,
                    "test_name": "Principal  Aptitude Test",
                    "coverage": "Communication Skills ;Tough-mindedness ;Ingenuity ;Leadership Skills ;Planning and Organizational Skills ;Teamwork Skills",
                    "total_questions": 33,
                    "duration": 33,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 8928,
                    "test_name": "Internet of Things Test",
                    "coverage": "Javascript ;Device Control ;Introduction to the Internet of Things ;Understanding the Device Landscape ;Setting Up the Intel Edison",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 8929,
                    "test_name": "OpenStack Test",
                    "coverage": "Introduction and Origin of OpenStack ;OpenStack Provisioning and Deployment ;OpenStack Storage Services ;Horizon Dashboard ;OpenStack Core Services ;Havana Services and OpenStack Distributions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 8933,
                    "test_name": "Marketing Aptitude Test",
                    "coverage": "Control ;Sociability ;Tough-mindedness ;Ingenuity ;Work Drive ;Decision Making ;Confidence",
                    "total_questions": 47,
                    "duration": 47,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 8936,
                    "test_name": "Salesforce 2016 Skills Test",
                    "coverage": "Introduction to Cloud Computing and Salesforce ;Data Management and Data Loading ;Salesforce Custom Fields ;Salesforce Security ;SOQL ;Reports and Dashboards ;Salesforce Configuration, and Creating App and Database ;Salesforce Apex and Chatter",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 8953,
                    "test_name": "Banking and Finance Aptitude Test",
                    "coverage": "Numerical Ability  ;Goal Orientation ;Tough-mindedness ;Helpful Attitude ;Work Drive ;Decision Making ;Integrity and Honesty ;Logical and Analytical Skills",
                    "total_questions": 58,
                    "duration": 58,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8961,
                    "test_name": "Java Swing Test",
                    "coverage": "Menus and Toolbars ;Swing Events ;Swing Dialogs ;Swing Components ;Introduction to AWT and Java Swing ;Swing model architecture ;Painting and printing ;Swing Layout Management",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 8968,
                    "test_name": "Advertising Aptitude Test",
                    "coverage": "Communication Skills ;Sociability ;Composure ;Ingenuity ;Organizing Ability ;Work Drive ;Teamwork Skills",
                    "total_questions": 42,
                    "duration": 42,
                    "passing_marks": 60,
                    "category": "Sales and Marketing"
                },
                {
                    "test_id": 8973,
                    "test_name": "Bookkeeper Aptitude Test",
                    "coverage": "Numerical Ability  ;Control ;Organizing Ability ;Logical and Analytical Reasoning ;Accounting and Financial Aptitude ;Data Interpretation ;Integrity & Honesty",
                    "total_questions": 51,
                    "duration": 51,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8976,
                    "test_name": "3D Printing Test",
                    "coverage": "Introduction to 3D printing ;Stereolithography (SLA) and Laminated Object Manufacturing (LOM) ;Selective Laser Sintering (SLS) and Fused Deposition Modeling (FDM) ;Digital Light Processing (DLP) and Inkjet 3D printing ;Object 30 Pro 3D Printing, Polyjet Printing and Robocasting ;3D Printing Materials and Principles",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 8979,
                    "test_name": "Investment Banking Aptitude Test",
                    "coverage": "Numerical Ability  ;Communication Skills ;Tough-mindedness ;Work Drive ;Confidence ;Teamwork Skills ;Logical & Analytical Skills",
                    "total_questions": 47,
                    "duration": 47,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 8998,
                    "test_name": "Librarian Aptitude Test",
                    "coverage": "Computer Skills ;Helpful Attitude ;Interpersonal Skills ;Planning and Organizational Skills ;Integrity & Honesty",
                    "total_questions": 34,
                    "duration": 34,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 8999,
                    "test_name": "IT Manager Aptitude Test",
                    "coverage": "Communication Skills ;Tough-mindedness ;Problem Solving ;Work Drive ;Leadership Skills ;Planning Skills",
                    "total_questions": 38,
                    "duration": 38,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 9000,
                    "test_name": "Public Relations Aptitude Test",
                    "coverage": "Communication Skills ;Sociability ;Tough-mindedness ;Ingenuity ;Attention to Detail ;Organizing Ability ;Decision Making",
                    "total_questions": 39,
                    "duration": 39,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9001,
                    "test_name": "Professor Aptitude Test",
                    "coverage": "Communication Skills ;Boldness ;Patience ;Emotional maturity ;Leadership Skills ;Confidence ;Planning and Organizational Skills",
                    "total_questions": 38,
                    "duration": 38,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9009,
                    "test_name": "Microsoft Azure Test",
                    "coverage": "Networking ;Applications, Services and Roles ;Data and Storage ;Introduction to Azure ;Web Services with Azure ;SQL Azure",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 9027,
                    "test_name": "Selenium 2.5 Automation Test",
                    "coverage": "Selenium WebDriver ;Selenium IDE ;Test Synchronization and User Extensions in Selenium ;Test Design Considerations used by Selenium ;Selenium Grid ;Selenium Commands",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9067,
                    "test_name": "Oracle Applications Skills Test",
                    "coverage": "Manufacturing and Finance modules ;Forms, reports, Appworx ;Unix (shell script) ;Advanced PL/SQL",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9068,
                    "test_name": "VMware Test",
                    "coverage": "Networking ;VMware Security and Disaster Recovery ;Resources and vCenter Management ;VMware Commands ;VMware Storage ;Introduction to VMware",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9075,
                    "test_name": "School Counselor Aptitude Test",
                    "coverage": "Communication Skills ;Perspective ;Interpersonal Skills ;Patience ;Emotional maturity ;Compassion ;Sensing ;Listening Ability",
                    "total_questions": 44,
                    "duration": 44,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9076,
                    "test_name": "School Teacher Aptitude Test",
                    "coverage": "Communication Skills ;Ingenuity ;Curiosity ;Helpful Attitude ;Interpersonal Skills ;Patience ;Leadership Skills",
                    "total_questions": 41,
                    "duration": 41,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9077,
                    "test_name": "Senior Customer Care Executive Aptitude Test",
                    "coverage": "Creativity ;Drive ;Desire to please ;Perfectionism ;Accountability ;Intrinsic Motivation ;Rationality ;Fairness/Egalitarianism ;Maturity/Wisdom ;Enthusiasm ;Social Adeptness ;Thriftiness",
                    "total_questions": 43,
                    "duration": 43,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9082,
                    "test_name": "Stockbroker Aptitude Test",
                    "coverage": "Tough-mindedness ;Attention to Detail ;Interpersonal Skills ;Work Drive ;Self-discipline ;Confidence ;Logical & Analytical Skills",
                    "total_questions": 43,
                    "duration": 43,
                    "passing_marks": 60,
                    "category": "Finance and Accounting"
                },
                {
                    "test_id": 9085,
                    "test_name": "Teaching Assistant Aptitude Test",
                    "coverage": "Communication Skills ;Problem Solving ;Helpful Attitude ;Positive Attitude ;Planning and Organizational Skills ;Caring",
                    "total_questions": 35,
                    "duration": 35,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9087,
                    "test_name": "Yoga Teacher Aptitude Test",
                    "coverage": "Interpersonal Skills ;Patience ;Leadership Skills ;Self-discipline ;Passion for Fitness ;Planning and Organizational Skills",
                    "total_questions": 33,
                    "duration": 33,
                    "passing_marks": 60,
                    "category": "Psychometric Tests"
                },
                {
                    "test_id": 9102,
                    "test_name": "NoSQL Test",
                    "coverage": "Introduction to NoSQL ;Key-Value Stores ;NoSQL on Cloud ;Document Databases ;Graph and Triple Stores ;Content Management using Big Tables ;Relational Databases ;NOSQL Selection Criteria",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9154,
                    "test_name": "Hibernate 5.1.0 Skills Test",
                    "coverage": "Bootstrap, Persistence Contexts and Flushing in Hibernate ;Database, Transactions and Concurrency Control in Hibernater ;Locking, Fetching and Batching in Hibernate ;Hibernate Architecture and Domain model ;Caching, Interceptors and Events in Hibernate ;HQL and JPQL",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 9168,
                    "test_name": "Oracle 12c Database Administration Test",
                    "coverage": "Schema Objects ;Introduction and Basic Database Administration ;Database Resource Management and Task Scheduling ;Oracle Database Structure and Storage ;Distributed Database and Multitenant Environment Management ;Structured Query Language",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9178,
                    "test_name": "Electronics and Communication Engineering Skills Test",
                    "coverage": "Microcontrollers ;Computer Organization and Architecture ;Basic Analog Electronics ;Data Communication and Computer Networks ;Operational Amplifiers and Linear ICs ;Circuit Theory ;Electromagnetic Field and Antenna Theory ;Digital Networks and Switching ;Digital Circuits and Systems ;Digital Signal processing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9179,
                    "test_name": "Operating System Concepts Test",
                    "coverage": "Memory Management ;Introduction to Operating System & its Structure ;Processes, Threads and Synchronization ;Storage Management ;Distributed Systems and VM (Virtual Machine) ;Protection and Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 9180,
                    "test_name": "Google Docs Test",
                    "coverage": "Sharing and Publication in Google Docs ;Editing Features in Google Docs ;Paragraph Formatting ;Comments and Suggestions in Google Docs ;Page Formatting in Google Docs ;Basics of Google Docs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9181,
                    "test_name": "Teradata Skills Test",
                    "coverage": "Tools and Utilities ;Database Availability Features ;Data Access Methods ;Teradata SQL ;Concurrency Control and User Security/Privacy ;Teradata SQL Functions",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9190,
                    "test_name": "DevOps Test",
                    "coverage": "Quality and Testing in DevOps ;Introduction to DevOps Terminology and Concepts ;DevOps Building Blocks ;DevOps Feedback and Area Matrix ;Automatic Releasing in DevOps",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 9191,
                    "test_name": "Google Sheets Test",
                    "coverage": "Formatting in Google Sheets ;Editing in Google Sheets ;Functions and Formulas in Google Sheets ;Sorting,Filtering and Protection in Google Sheets ;Data Validation and Representation in Google Sheets ;Images and Charts in Google Sheets",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9194,
                    "test_name": "Sensor Integration Test",
                    "coverage": "Direct Interfacing Techniques For Sensors ;Introduction to Sensor Integration ;Temperature Sensors ;Microcontroller to Sensor Interfacing Techniques",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Electronics"
                },
                {
                    "test_id": 9200,
                    "test_name": "DB2 11 Database Administration for z/OS Test",
                    "coverage": "Performance ;Security and Auditing ;DB2 Database Design and Implementation ;Altering Database Design ;Operations and Recovery ;Distributed Access and Additional Database Functionalities",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9202,
                    "test_name": "Google Slides Test",
                    "coverage": "Presenting and Printing Google Slides ;Formatting in Google Slides ;Basics of Google Slides ;Inserting Images and Shapes in Google Slides",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9204,
                    "test_name": "XAML Test",
                    "coverage": "XAML- LAYOUTS ;XAML - STYLES and RESOURCES ;XAML- Binding ;Basics of XAML ;XAML -ANIMATION AND PROPERTIES ;XAML - CONTROLS AND ELEMENTS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Programming"
                },
                {
                    "test_id": 9209,
                    "test_name": "Basics of Unified Functional Testing (UFT) Test",
                    "coverage": "Basics of UFT ;UFT Panes, Configurations ;API testing and Introduction to VBScript and BPT ;Introduction to UFT ;Running and Debugging Operations ;ALM, GUI testing design with UFT IDE ;Test objects, Output values and Checkpoints",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9214,
                    "test_name": "Switching Protocols Test",
                    "coverage": "802.1ad QinQ Tunneling ;Spanning Tree Protocol ;Link Aggregation ;Virtual Trunking Protocol ;VLAN ;LACP",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 9246,
                    "test_name": "Routing Protocols Test",
                    "coverage": "Multi-Protocol Label Switching (MPLS) ;Protocol Independent Multicast (PIM) ;Open Shortest Path First (OSPF) ;Routing Information Protocol (RIP) ;Internet Group Management Protocol (IGMP) ;Border Gateway Protocol(BGP)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 9260,
                    "test_name": "Pega Applications Test",
                    "coverage": "Application Design ;User Experience ;Case Design ;Automating Business Policies ;Data Model ;Reporting & Integration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9270,
                    "test_name": "Network Management Technologies Test",
                    "coverage": "SNMP ;Netconf ;Configuration Management Concepts and Methods ;Fault and Performance Concepts ;FCAPS ;Security Management",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 9384,
                    "test_name": "COBOL Programming Skills Test",
                    "coverage": "COBOL String Handling and Table Processing ;File Handling in COBOL ;COBOL conditional Statements and Loop Statements ;COBOL Data Types, Basic Verbs and Data Layout ;Fundamentals of COBOL ;COBOL Subroutine, Sorting and Database Interface",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 9430,
                    "test_name": "Manual Testing Test",
                    "coverage": "Black Box Testing ;System and Acceptance Testing ;Integration, Mutation and Baseline Testing ;White Box Testing ;Software Development Processes and Testing ;Introduction to Testing and Manual Testing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9432,
                    "test_name": "Environmental Science and Engineering Test",
                    "coverage": "Hydrology & water resources engineering ;Applied hydraulics & fluid machines ;Air and noise pollution and its control ;Environmental policy and its regulation, occupational hazards and industrial safety ;Soil mechanics ;Wastewater engineering ;Disposal of solid waste ;Water pollution & control",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9433,
                    "test_name": "Mechatronics Engineering Test",
                    "coverage": "Strength of materials ;Thermodynamics ;Fluid Mechanics and Machinery ;Design of Machine Elements ;Microprocessors and Applications ;Microcontroller and PLC ;Control System Engineering ;Mechanics of Machines and Automobile Engineering ;Manufacturing Technology & Hydraulic and Pneumatic Systems",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9435,
                    "test_name": "Automobile Engineering Test",
                    "coverage": "Strength of materials ;Thermodynamics ;Fluid Mechanics and Machinery ;Automotive Engines ;Automotive Chassis and Vehicle Dynamics ;Automative Fuels, Pollution and Control ;Mechanics of Materials and Manufacturing Technology ;Microcontroller and PLC & Design of Machine Elements",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9452,
                    "test_name": "International Business Management Test",
                    "coverage": "Introduction to International Business ;International Trade theories and their application ;International Business Environment ;Culture and International Business ;Foreign Investments ;Regional integration ;Global trade institutions ;International Financial Management ;International Accounting Practices ;International Marketing ;International Strategic Management ;Ethics in International Business ;International Human Resource Management ;Finance and International Trade ;Global Sourcing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 9454,
                    "test_name": "Production Engineering Test",
                    "coverage": "Strength of materials ;Theory of machines ;Machines Design ;Engineering Materials ;Production Technology",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9457,
                    "test_name": "Manufacturing Engineering Test",
                    "coverage": "Machine design ;Thermodynamics ;Casting &amp; Welding ;Engineering Materials &amp; Metallurgy ;Industrial Management ;Fluid Mechanics &amp; Hydraulics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9473,
                    "test_name": "Android Testing Test",
                    "coverage": "Introduction to Android Testing ;Testing Android Using Selenium and Appium ;UI/Application Exerciser Monkey and MonkeyRunner ;Debugging Android Apps and Best Practices for Testing ;Android Command line tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9500,
                    "test_name": "Cloud Foundry Test",
                    "coverage": "Cloud Foundry Concepts and Deployment ;cf Command Line Interface ;Administering Cloud foundry and Users ;Development and Management of Applications in Cloud Foundry ;Cloud Foundry Custom Services, Logging and Metrics ;Running and troubleshooting Cloud Foundry ;Spring Framework, Spring Cloud and Pivotal Cloud Foundry",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9501,
                    "test_name": "Data Virtualization Test",
                    "coverage": "Data Consumer and Hosting/Application Layer ;Data Integration and Data Source Layer ;Physical and Logical Data Layers ;Decision Support System, BI and Data Virtualization Architecture ;Abstraction and Transformation ;Data Delivery and Data Federation ;Data Virtualization Overview and Virtualized Data Access ;Fundamental Problems in Data Integration and the Changing World of BI ;Traditional BI Architecture and DWH Drawbacks",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9505,
                    "test_name": "Hortonworks Skills Test",
                    "coverage": "Hortonworks DataFlow ;Hortonworks SmartSense ;Hortonworks Data Platform ;Apache Spark on HDP ;Hortonworks Security ;Hortonworks Sandbox and Hadoop Administration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9510,
                    "test_name": "BI-Fundamentals using R Programming Test",
                    "coverage": "Installing and Running R ;R syntax, Data Types, Variables, Operators, Functions, Vectors, Matrices, Lists ;Data Handling in R ;R statistics and R Data frames, Packages and Data Reshaping ;R Charts and Graphs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 9513,
                    "test_name": "Structural Engineering Test",
                    "coverage": "Concrete Technology ;RCC Structures ;Structural Design Specification (ISI) ;Theory of structures ;Structural analysis ;Steel structure design",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9526,
                    "test_name": "BI Data Visualization using Tableau Test",
                    "coverage": "Calculated Fields and Table Calculations in Tableau 8 ;Sharing & Distributing Tableau Applications ;Introduction to Tableau and Basic Visualization Design ;Connecting to Data Source in Tableau ;Tableau Charts, Maps and Dashboards ;Tableau Formatting and Interaction with Viewers",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9530,
                    "test_name": "BI Data Visualization using TIBCO Spotfire Test",
                    "coverage": "Data Handling in Tibco Spotfire ;Collaboration and Annotations in Tibco Spotfire ;Creating a Visualization using Tibco Spotfire ;Tibco Spotfire Desktop Client ;Map Charts, Sorting and Positioning Data",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9555,
                    "test_name": "Power Systems Engineering Test",
                    "coverage": "Performance of transmission lines, line parameters, corona, compensation techniques & voltage profile control. ;Distribution systems, cables, insulators, economic power generation & load dispatch ;Load flow studies & fault analysis ;Power system stability ;Power system protection & switch gear ;Generating power stations ;Hvdc transmission , per unit system & power system transients",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9604,
                    "test_name": "Cloudera Enterprise 5.8.x Administration Test",
                    "coverage": "Performance Management ;Managing Cloudera Distributed Hadoop and Services ;Backup and Disaster Recovery ;Resource Management ;High Availability ;Cloudera Manager and Navigator Data Management",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9607,
                    "test_name": "Network Design Skills Test",
                    "coverage": "Hierarchical network design ;Network Security Design Considerations ;Network Design Physical Layer Considerations ;Layer 2 Resiliency and Redundancy ;Layer 3 Resiliency and Redundancy ;WAN/LAN/VLAN design concepts ;Network Management Protocols",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 9619,
                    "test_name": "CISCO CUCM Skills Test",
                    "coverage": "User Management ;CUCM telephony design concepts ;Reaching the PSTN ;Call routing ;End Devices and Media Resources ;Special Services (Presence, Collaboration, CCX etc.)",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Networking"
                },
                {
                    "test_id": 9623,
                    "test_name": "Business Analytics using SAS Test",
                    "coverage": "Introduction to Business Analytics and Predictive Analysis ;SAS Loops, Decision Making and Functions ;SAS Data Set Operations ;SAS Data Representation ;Fundamentals of SAS ;SAS Programming Basic Concepts ;SAS Statistical Procedures",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 9633,
                    "test_name": "BigData and Hadoop Ecosystems Test (Intermediate level)",
                    "coverage": "MapReduce Programming ;Pig ;Hive ;HBase ;Data Management ;Oozie ;ZooKeeper",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9635,
                    "test_name": "Product User Experience Test",
                    "coverage": "Introduction to Usability and User Experience ;Product Experience and Customer Experience Processes ;Persona and Content Strategy ;Wireframe, Annotations and Prototyping ;User Experience Front End Best Practices",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Management"
                },
                {
                    "test_id": 9640,
                    "test_name": "Data Analytics Test (Beginners)",
                    "coverage": "Hypothesis Testing ;Web Analytics ;Basic Overview of Data Mining ;Correlation and Regression ;Probability and Statistics ;Classification Overview ;Introduction to Data Analysis using R ;Regression Analysis ;Sampling Techniques ;Text Mining Overview ;Starting Mining methods and algorithms ;Association Rule Mining ;Analyzing Data with Python ;Statistical Modelling - Statistics Concepts and Overview ;Data Science Methodology ;Big Data Analytics - Demos ;Advanced Statistics Programs",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9643,
                    "test_name": "BigData and Hadoop Ecosystems Test (Beginners)",
                    "coverage": "Introduction to Hadoop ;Introduction to Big Data ;HDFS ;Hadoop Distribution ;Introduction to Hadoop Administration ;Configuring Hadoop ;MapReduce Job ;MapReduce Data Flow ;Introduction to Hadoop Stack ;Introduction to Pig ;Introduction to Hive ;Introduction to NoSQL DBs ;Introduction of YARN ;Hadoop 1 Vs Hadoop 2",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9645,
                    "test_name": "Data Analytics Test (Intermediate Level)",
                    "coverage": "Introduction to Data Analysis using R ;Regression Analysis ;Association Rule Mining ;Time Series Analysis ;Matrix Algebra ;Text Mining ;Classification of Algorithms ;R Programming Language Introduction ;Advanced Statistics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9653,
                    "test_name": "Thermal Engineering Test",
                    "coverage": "Thermodynamics ;Heat & Mass Transfer ;Refrigeration And Air-Conditioning ;I.C. Engines ;Steam boilers, engines, nozzles and turbines ;Compressors, Gas turbines & Jet engines",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9758,
                    "test_name": "Mobile Application Testing Test (Beginners)",
                    "coverage": "Introduction to Mobile App Testing ;Functional and Non&#45;Functional Testing ;Mobile Testing Methodologies and Approach ;Mobile Test Automation ;Mobile Application Testing Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9767,
                    "test_name": "Welding Engineering Test",
                    "coverage": "Physical Metallurgy ;Welding Metallurgy ;Welding Processes ;Advanced Welding Processes ;Welding Codes and Standards",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9768,
                    "test_name": "Communication Skills Test",
                    "coverage": "Public Speaking ;Interpersonal Communication Skills ;Preparation, delivery, vocabulary",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Communication Skills"
                },
                {
                    "test_id": 9780,
                    "test_name": "Mobile Application Testing Test (Intermediate)",
                    "coverage": "Android Development Platform and Testing ;iOS Development Platform and Testing ;Mobile Application Security Testing Services ;Mobile Application Usability and Accessibility Testing Services ;Overview of Mobile Technologies and Latest trends ;Specialised Testing Services ;Mobile Test Automation using Calabash",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9841,
                    "test_name": "RESTful Java Web Services Test",
                    "coverage": "Java API for RESTful Web Services ;Resources and URIs ;Introduction to Web services, REST, JSON ;Creating & Invoking RESTful Web Services ;Conditional HTTP Requests ;Handling Attachments in CXF REST Services ;Using JAX-RS with JAXB ;JSON Message Support",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Internet Concepts"
                },
                {
                    "test_id": 9866,
                    "test_name": "Hybrid App Development Test (Beginners)",
                    "coverage": "Javascript ;JQUERY ;Introduction to PhoneGap ;HTML5 & CSS3 ;Introduction to iOS and Android ;Introduction to Hybrid App ;Mobile Web Development ;NPM",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 9868,
                    "test_name": "Machine Learning Test",
                    "coverage": "Data Mining ;Machine Learning Introduction ;Artificial Neural Networks ;Regression in Machine Learning ;MATLAB ;Advanced Machine Learning ;Simulator in Machine Learning",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 9881,
                    "test_name": "Knowledge of SAP HANA Test",
                    "coverage": "SAP HANA Administration ;SAP HANA Modeling ;SAP HANA Concept ;SAP HANA Data Replication and Studio ;SAP HANA Database Management",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9906,
                    "test_name": "Mobile Testing Test",
                    "coverage": "Mobile testing and Mobile Application testing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9907,
                    "test_name": "Jenkins Skills Test",
                    "coverage": "Overview of Jenkins ;Jenkins plugins ;Security in Jenkins ;Testing in Jenkins ;Deployment in Jenkins ;Distributed Builds in Jenkins ;Management of Jenkins",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 9917,
                    "test_name": "Knowledge of SAP BASIS Skills Test",
                    "coverage": "SAP GUI ;SAP Basis Concepts ;SAP Basis Client Management ;SAP Basis Transport Management ;SAP Basis Background Job ;SAP Basis User Management ;SAP Basis NetWeaver ;SAP Basis Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9989,
                    "test_name": "Knowledge of SAP ABAP Skills Test",
                    "coverage": "SAP ABAP Basics ;SAP ABAP programming ;SAP Smart Form ;SAP Scripting ;SAP ALE/EDI/IDOC ;Other SAP Concepts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 9990,
                    "test_name": "Android 7 skills test",
                    "coverage": "Introduction to Android Development and Android Studio ;The Android Manifest and Resources ;User Interface, Animation and Graphics ;Media, Camera, Location, Sensors and Connectivity ;Android Media Apps and Connectivity ;Text and Input, Data Storage, and Administration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 10103,
                    "test_name": "Photoshop CC 2017 Test",
                    "coverage": "Filters ;Advanced Features  ;Working with Colors ;Photoshop Basics ;Working with Layers ;Photoshop Fundamentals ;Selection and Transformations ;Image Adjustment ;Masking and Special Effects",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 10110,
                    "test_name": "Logical Reasoning Skills Test",
                    "coverage": "Logical Reasoning",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 10122,
                    "test_name": "Final Cut Pro 10.0 Skills Test",
                    "coverage": "Keyboard Shortcuts and Gestures ;Final Cut Pro Basics ;Preferences and metadata ;Import Media ;Organize your library ;Play back and skim media ;Keying and compositing ;Manage media, libraries, and archives ;Advance Editing",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 10123,
                    "test_name": "Life Sciences Test",
                    "coverage": "Life sciences",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Healthcare"
                },
                {
                    "test_id": 10163,
                    "test_name": "iOS 10 Programming Skills Test",
                    "coverage": "Memory Management ;Security and Privacy ;GCD ;CoreData Framework ;Apple Pay ;App Extensions ;Widgets and Notifications ;Siri Integration ;Dual Camera And Device Discovery Feature",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 10168,
                    "test_name": "Windows 10 Skills Test",
                    "coverage": "Introduction to Windows 10 ;Windows 10 GUI, Navigation, taskbar and File Explorer ;Windows 10 Cortana, Notification, Quick Action ;Windows 10 Security and User Management ;Windows 10 Networking Virtualization and Remote Access ;Windows 10 Cloud, Multiple Desktop and Universal Apps ;Working With Pictures in Windows 10 ;Windows Media Player",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 10174,
                    "test_name": "Mobile Computing (Android) Test",
                    "coverage": "Overview of Android OS ;Android Activities ;Android Services ;Android SDK Training ;Developing & Distributing Android Apps ;Simple Android Development Tools",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10175,
                    "test_name": "Team Foundation Server Test",
                    "coverage": "Build System Configuration and Management ;Users, Groups and Permissions Configuration ;Team Foundation Server Overview ;Server Configuration Management ;Team Foundation Server Security ;Deployment Backup and Restoration ;Lab Management Configuration",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 10178,
                    "test_name": "Microsoft Excel 2016 Skills Test",
                    "coverage": "Protection and Security ;Introduction to Excel 2016 ;Working with Workbooks ;Excel 2016 Backstage View ;Excel 2016 Formulas and Functions ;Data Handling and Macros ;PivotChart and PivotTable",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 10179,
                    "test_name": "Bamboo Skills Test",
                    "coverage": "Managing E&#45;mails ;Bamboo Plugins and Security ;Bamboo with different Applications ;Managing Bamboo Agents and Capabilities ;Elastic Bamboo and Bamboo Builds ;Handling Bamboo Users and Permissions ;Handling Bamboo Data and Backups ;Managing System issues and Settings",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10184,
                    "test_name": "Microsoft Word 2016 Skills Test",
                    "coverage": "Working with Graphics ;Working with Charts ;Microsoft Word 2016 fundamentals ;Formatting and Page Layouts ;Working with Tables and Macros ;Review, Protection and Security",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 10185,
                    "test_name": "R Programming Skills Test",
                    "coverage": "Functions ;Graphs ;Interfaces ;Basics ;Data ;Miscellaneous ;Control structures ;Statistical Analysis",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10201,
                    "test_name": "Microsoft PowerPoint 2016 Skills Test",
                    "coverage": "Animation ;Keyboard Shortcuts ;Creating a presentation ;Designing a presentation ;Designing the slides ;Animations and Multimedia, Pictures & Charts ;New features of PowerPoint 2016",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 10210,
                    "test_name": "SCALA Programming Skills Test",
                    "coverage": "Operators ;OOPS  ;Collections ;Regular Expressions ;Basics ;Miscellaneous ;Strings& Arrays ;Exceptions& Multithreading",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10218,
                    "test_name": "Microsoft Office 2016 Skills Test",
                    "coverage": "Microsoft Word 2016 ;Microsoft Excel 2016 ;Microsoft PowerPoint 2016",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 10222,
                    "test_name": "iOS 9 Programming Skills Test",
                    "coverage": "iOS 9 API Framework ;iOS 9 Development ;iOS 9 XCode ;iOS 9 Swift Programming ;iOS 9 TableView and AdaptiveUI with Auto Layout ;iOS 9 fundamentals ;iOS 9 Touch and Motion events",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Mobile Technologies"
                },
                {
                    "test_id": 10225,
                    "test_name": "Windows Server 2016 Skills Test",
                    "coverage": "Administration ;Networking ;Security ;Introduction ;Software Based Datacenter ;Installation and Migration ;Failover Clustering ;Identity and Access ;Remote Access ;Virtualization",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Operating Systems"
                },
                {
                    "test_id": 10235,
                    "test_name": "TPM and Manufacturing Excellence Test",
                    "coverage": "Introduction to TPM ;OEE(Overall Equipment Efficiency&#41; ;TPM Implementation and organization structure ;Pillars of TPM",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10238,
                    "test_name": "Production and Quality Assurance (Food Technology) Test",
                    "coverage": "Food Technology",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10240,
                    "test_name": "Engineering Utilities Skills Test",
                    "coverage": "Engineering Utilities",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10241,
                    "test_name": "Production and Quality Assurance (Dairy Technology) Test",
                    "coverage": "Components, Properties of Milk ;Milk processing and Heat treatment ;Cream, Butter and Concentrated Milk ;Milk Power, Protein Preparations and Fermented Milk and Cheese",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10245,
                    "test_name": "Safety, Health and Environment Test",
                    "coverage": "Safety, Health and Environment",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10249,
                    "test_name": "Mechanical Maintenance Engineering Skills Test",
                    "coverage": "Mechanical Maintenance",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10265,
                    "test_name": "Engineering Project Planning Skills Test",
                    "coverage": "Project Planning - Engineering",
                    "total_questions": 30,
                    "duration": 30,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10314,
                    "test_name": "Dart Programming Skills Test",
                    "coverage": "Operators ;OOPS  ;Collections ;Strings ;Basics ;Miscellaneous ;Exceptions & Debugging ;Libraries, Async & Concurrency",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10399,
                    "test_name": "Microsoft Exchange Server 2016 Skills Test",
                    "coverage": "Policies ;Miscellaneous ;Planning and Deployment ;Permissions ;Clients & Recipients ;Collaborations ;Availability and Resilience ;Introduction to Microsoft Exchange Server 2016",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 10400,
                    "test_name": "PHP 7.1 Skills Test",
                    "coverage": "PHP Basic Types ;PHP 7.1 New features and functions ;PHP operators and Control Structure ;PHP Functions and namespaces ;PHP Classes and objects ;PHP Errors, Exceptions and Generators ;Introduction to PHP 7.1, Variables and Constants",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10424,
                    "test_name": "Japanese Vocabulary Skills Test",
                    "coverage": "Synonyms ;HOMOPHONES ;DEFINITIONS ;ANTONYMES ;How to read Kanji characters ;CONTEXTUAL SIGNIFICANCE",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "International Languages"
                },
                {
                    "test_id": 10425,
                    "test_name": "Maven Skills Test",
                    "coverage": "Maven Skills",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 10496,
                    "test_name": "UI/ UX Skills Test",
                    "coverage": "Introduction to Usability and User Experience ;Product Experience and Customer Experience Processes ;Persona and Content Strategy ;Wireframe, Annotations and Prototyping ;User Experience Front End Best Practices ;User Interface Concepts",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Graphics Designing"
                },
                {
                    "test_id": 10553,
                    "test_name": "SQL Server 2016 Skills Test",
                    "coverage": "Introduction to SQL Server ;Temporal Tables ;SQL Statements ;SQL Data type and Functions ;New features of SQL Server 2016 ;SQL Database and Tables ;Creating Databases, Updating and Reading Data in SQL Table ;Database Console Commands",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 10559,
                    "test_name": "Go Language Programming Skills Test",
                    "coverage": "Miscellaneous ;Introduction to Go language ;Variables, Types and Constants ;Functions and Packages ;Conditional Statements and Loops ;Arrays, Slices and Variadic Functions ;Strings and Maps ;Pointers, Structures and Methods ;Interfaces and concurrency",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10560,
                    "test_name": "PASCAL Programming Skills Test",
                    "coverage": "Fundamentals ;String Manipulation ;Data Structures ;Functions ;Sorting ;Compilation ;Data Types ;Modules ;Program Flow,Sub Programs and Loops ;Input Output ;Operators,Arrays and Linked Lists ;Control statements and Pointers ;Linking Libraries ;Pascal Tokens ;Memory Management and File Handling ;Implementing Algorithms",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10571,
                    "test_name": "Engineering Physics Test",
                    "coverage": "Mathematical Physics ;Electromagnetic Theory ;Classical Mechanics and Quantum Mechanics ;Thermodynamics and Statistical Physics ;Atomic and Molecular Physics ;Solid State Physics ;Nuclear and Particle Physics ;Electronics",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Engineering  Skills"
                },
                {
                    "test_id": 10602,
                    "test_name": "Arabic To English Translation Skills Test",
                    "coverage": "Sentence Structure ;Pronouns ;Participles and Gerunds ;Time expressions ;VERB TENSES ;ADJECTIVES AND ADVERBS ;ARTICLES AND PREPOSITIONS ;DIRECT AND INDIRECT SPEECH",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Translation Skills"
                },
                {
                    "test_id": 10670,
                    "test_name": "Cucumber Skills Test",
                    "coverage": "Introduction to Cucumber ;Cucumber Installation Framework Specific Implementation ;Gherkin ;Step Definitions ;Cucumber Expressive Scenarios ;Cucumber Command Line Interface ;Bootstrapping Rails, Using Capybara, Aruba",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 10692,
                    "test_name": "Ethical Hacking Test",
                    "coverage": "Linux Basics ;Introduction to Ethical Hacking ;Cryptography, Footprinting, Reconnaissance and Enumeration ;Sniffers and Buffer Overflow ;Network Scanning ;Trojans, Worms and Covert Channels ;Denial of Service ;Session Hijacking, Remote Exploitation and Client Side Exploitation",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Software Testing"
                },
                {
                    "test_id": 10724,
                    "test_name": "Windows PowerShell 6 Skills Test",
                    "coverage": "Windows Powershell 6",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 10734,
                    "test_name": "Microsoft Outlook 2016 Skills Test",
                    "coverage": "Introduction to Outlook 2016 ;Managing Outlook Email messages ;Manage Scheduling ;Managing Calendar ;Tracking Tasks using Outlook 2016 ;Manging Windows Elements ;Customizing Outlook Options and Managing Email Automatically ;Organizing Inbox and Managing Contacts in Outlook 2016",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 10811,
                    "test_name": "Embedded C Test",
                    "coverage": "Data Structures ;Pointers ;Memory ;Watchdog functionality",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10812,
                    "test_name": "Nagios Skills Test",
                    "coverage": "Nagios architecture ;Getting started with Nagios ;Nagios Administration ;Monitoring Linux systems ;Monitoring Windows and Databases ;Monitoring Network devices ;Monitoring Applications ;Nagios alerts and notifications ;Auto&#45;Discovery ;Maps ;UI Tweaks",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Open Source Tools and Technologies"
                },
                {
                    "test_id": 10814,
                    "test_name": "Perl 5.26 Test",
                    "coverage": "Introduction to Perl ;Perl Variables ;Perl Subroutines and Operators ;Perl Functions ;Perl Plain Old Documentation Format and Diagnostics ;Perl Debugging and Regular Expressions ;Perl references, Tie, Security and OOPS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "General Programming"
                },
                {
                    "test_id": 10820,
                    "test_name": "SAP UI5 Skills Test",
                    "coverage": "Introduction to SAPUI5 ;SAP UI Development Toolkit for HTML5 ;MVC and Data Binding Concepts ;SAPUI5 Controls ;SAP Fiori Elements ;Developing Applications with SAPUI5 ;SAPUI5 Routing Concepts and CRUD Operations ;Charts, Graphs (Viz Frames), Maps",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Databases"
                },
                {
                    "test_id": 10915,
                    "test_name": "ReactJS Test",
                    "coverage": "Introduction to ReactJS ;React Components ;React API and DOM ;Updating React Components ;List, Keys and Forms ;ReactJS Flux and Animations ;Testing React ;Test Utilities, Shallow Renderer and test renderer",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 10957,
                    "test_name": "Microsoft Access 2016 Skills Test",
                    "coverage": "Operators ;Functions ;Queries ;Access 2016 Keyboard Shortcuts ;Introduction to Microsoft Access 2016 ;Tables and Relationships",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Computer Skills"
                },
                {
                    "test_id": 11011,
                    "test_name": "Backbone.js Test",
                    "coverage": "Introduction to Backbone.JS and JavaScript ;Backbone.js Model and Collection ;Backbone Router and Events ;Backbone View and Templating Libraries ;Backbone Ecosystem ;Backbone.js Testing ;Using Grunt with Backbone ;Backbone with Marionette, Thorax and Manageable JavaScript Code Base",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 74,
                    "test_name": "Computer Aptitude Test",
                    "coverage": "Computer Aptitude",
                    "total_questions": 35,
                    "duration": 45,
                    "passing_marks": 60,
                    "category": "Intelligence and Aptitude"
                },
                {
                    "test_id": 16,
                    "test_name": "Enterprise Java Beans (EJB) 2.0 Test",
                    "coverage": "Fundamentals ;EJB Transaction support ;EJB Architecture ;Bean Management ;Deployment ;Query",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 17,
                    "test_name": "JDBC 2.1 Test",
                    "coverage": "Fundamentals ;JDBC API ;SQL Fundamentals ;JDBC Drivers ;JDBC Application",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Java Technologies"
                },
                {
                    "test_id": 165,
                    "test_name": "FrontPage 2000 Test",
                    "coverage": "FrontPage 2000 Fundamentals ;Frontpage 2000 Advanced Features ;Designing Web Pages ;Analysing Webs using FrontPage 2000 ;Ensuring Web Compatibility ;HTML and CSS",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Microsoft Technologies"
                },
                {
                    "test_id": 193,
                    "test_name": "XHTML 1.0 Test",
                    "coverage": "Fundamentals ;Tags ;Images and Links ;Tables and Forms",
                    "total_questions": 40,
                    "duration": 40,
                    "passing_marks": 60,
                    "category": "Web Designing"
                }
            ]
		};

        CBTService.saveTest(data);
    },

    getLandingPage: function (req, res) {
        var request = require('request');
        var qs = require('querystring');

        req.session.application_id = req.param('job_id');

        var data = {
            password: '1p2r9o6d4u5t1c',
            partnerid: '1296451',
            testid: req.param('test_id'),
            partneruserid: req.session.userId,
            gqtestid: req.param('gqtest_id'),
            returnURL: 'https://getqualified.work/test/show-result/' + req.param('test_id'),
            dev: false,
            debug: false,
            //secure_mode: 1,
            //browser_proctoring: 1,
            //webcam_proctoring: 1,
            //webcam_mandatory: 1,
            //reuse: true,
            er_internal: '1296451'
        };
        //console.log(data)
        request.post('https://assessments.getqualified.work/webservices/generateticket.aspx', { form: qs.stringify(data) }, function(err, response, body) {
            var result = JSON.parse(body);
            if (err || result.response.info.success != 1) {
                // show error page
            }
            return res.redirect(result.response.info.ticket);
        });
    },

    receiveAndSaveResult: function (req, res) {
        var temp = Object.keys(req.body);
        temp += ':' + req.body[temp];
        var data = JSON.parse(temp);
        var result = data.request.method;

        CBTTest.find({ test_id: result.test_id }).exec(function(err, test) {
            var test_result = {
                test_id: result.test_id,
                applicant: result.user_id,
                percentage: result.percentage,
                score: Math.floor((result.percentage / 100) * test[0].total_questions),
                percentile: result.percentile,
                average_score: result.average_score,
                test_result: result.test_result,
                transcript_id: result.transcript_id,
                //jobtest: jobtest[0].id
            };
            TestResult.find({ test_id: result.test_id, applicant: result.user_id }).exec(function(err, result) {
                if (result.length > 0) {
                    TestResult.update({ test_id: result.test_id, applicant: result.user_id }, test_result).exec(function() {});
                } else {
                    TestResult.create(test_result).exec(function (err) {
                        if (err) console.log(err);
                    });
                }
            });
        });
        // update application
        if (req.session.job_id) {
            // update application status
            Application.update({ id: req.session.application_id }, { status: 'Under Review' }).exec(function() {});
        }
        return res.ok();
    },

    ajaxTest: function(req, res) {
        console.log(req.param('msg'));
        return res.ok();
    }
};
