/*Skills info */
var skills =
["HTML5", "CSS3", "javaScript", "JQuery", "PHP"];

/* Bio info */

var bio ={
	"name": "Hernando J. Farfán V.",
	"role" : "Web Developer",
	"contacts" : {
		"email" : "hernando.farfan@yahoo.com",
		"github" : "subdomestic",
		"twitter" : "@subdomestic",
		"location" : "Bogota, Colombia"
	},
	"bioPic" : "images/me.jpg",
	"welcomeMessage" : "Hello, This is my interactive CV, hope you find useful information here",
	"skills" : skills
};

/* Display contact info */
bio.display = function(){

/* Format text to insert in index.html */
var formattedName= HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
var formattedWelcomeMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
var formattedBioPic = HTMLbioPic.replace("%data%", bio.bioPic);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);


/* Display info in #header */
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
$("#header").append(formattedBioPic);
$("#header").append(formattedWelcomeMessage);

/* Display info in #topContacts */

$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedLocation);

/* Display info in #footerContacts */

$("#footerContacts").append(formattedEmail);
$("#footerContacts").append(formattedGithub);
$("#footerContacts").append(formattedTwitter);
$("#footerContacts").append(formattedLocation);

/* Check is there are any skill in the bio variable and display it*/

if(bio.skills.length>0){
      $("#header").append(HTMLskillsStart);

      for(skill in bio.skills){
        var formattedskills= HTMLskills.replace("%data%", bio.skills[skill]);
        $("#skills").append(formattedskills);
      }
    }

}

/* Work info */

var work = {
		"jobs" : [
		{
		"title" : "Specialized Professional",
		"employer"	: "MinICT",
		"dates"	: "03/03/2008 - 31/12/2015",
		"location"	: "Bogota, Colombia",
		"workDescription" : "Project management"
		},
		{
		"title" : "Web Developer",
		"employer"	: "Cesoft",
		"dates"	: "03/03/2008 - 31/12/2015",
		"location"	: "Bogota, Colombia",
		"workDescription" : "Web Development"
		},
		{
		"title" : "Web Developer",
		"employer"	: "Synergos",
		"dates"	: "03/03/2008 - 31/12/2015",
		"location"	: "Brussels, Belgium",
		"workDescription" : "Web Development"
		}]
	}

/* Display work info */

work.display = function(){
		for(var job in work.jobs){
			$("#workExperience").append(HTMLworkStart);
			var formattedJobTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
			var formattedJobEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
			var formattedJobDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
			var formattedJobLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
			var formattedJobDescription = HTMLworkDescription.replace("%data%", work.jobs[job].workDescription);
			$(".work-entry:last").append(formattedJobTitle);
			$(".work-entry:last").append(formattedJobEmployer);
			$(".work-entry:last").append(formattedJobDates);
			$(".work-entry:last").append(formattedJobLocation);
			$(".work-entry:last").append(formattedJobDescription);
	}
}

/* Education info */

var education = {
	"schools": [
		{
		"name" : "Los Andes University",
		"location" : "Bogota, Colombia",
		"degree" : "BSc Electronic Engineering",
		"majors" : "BSc",
		"dates" : 2005,
		"url" : "http://www.uniandes.edu.co"
		},
		{
		"name" : "The University of Manchester",
		"location" : "Manchester, UK",
		"degree" : "MSc Mangement and Information Systems: CHange and Development",
		"majors" : "MSc",
		"dates" : 2012,
		"url" : "http://www.manchester.ac.uk"
		}
	],
	"onlineCourses": [
	{
		"title" : "FrontEnd Developer Nanodegree Program",
		"school" : "Udacity",
		"dates" : 2015,
		"url" : "http://www.udacity.com"
	}]

}

/* Display education info */
education.display = function(){
	for(var school in education.schools){
			$("#education").append(HTMLschoolStart);
			var formattedSchoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
			var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
			var formattedSchoolDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
			var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
			var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors);
			$(".education-entry:last").append(formattedSchoolName);
			$(".education-entry:last").append(formattedSchoolDegree);
			$(".education-entry:last").append(formattedSchoolDates);
			$(".education-entry:last").append(formattedSchoolLocation);
			$(".education-entry:last").append(formattedSchoolMajor);
	}
	for(var course in education.onlineCourses){
			$(".education-entry:last").append(HTMLonlineClasses);
			var formattedCourseTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
			var formattedCourseSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
			var formattedCourseDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
			var formattedCourseURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
			$(".education-entry:last").append(formattedCourseTitle);
			$(".education-entry:last").append(formattedCourseSchool);
			$(".education-entry:last").append(formattedCourseDates);
			$(".education-entry:last").append(formattedCourseURL);
	}
}


/* Projects info */
var projects = {
	"projects": [
		{
			"title": "Portfolio",
			"date" : "May 2015",
			"description" : "Project 1 for nano degree program",
			"image" : "images/portfolio_img_200px.jpg"
		},
		{
			"title": "Interactive resume",
			"date" : "June 2015",
			"description" : "Project 2 for nano degree program",
			"image" : "images/interactive_resume_img_200px.jpg"
		},
		{
			"title": "El amor es para pobres",
			"date" : "June 2015",
			"description" : "Website based on wordpress",
			"image" : "images/eaepb_img_200px.jpg"
		},
		{
			"title": "Cesoft Colombia",
			"date" : "June 2015",
			"description" : "Corporative website based on PHP and javascript",
			"image" : "images/cesoftco_img_200px.jpg"
		}
	]
}

/* Display projects info */
projects.display = function(){

		for(project in projects.projects){
			$("#projects").append(HTMLprojectStart);
			var formattedProjTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
			var formattedProjDates = HTMLprojectDates.replace("%data%", projects.projects[project].date);
			var formattedProjDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
			var formattedProjImage = HTMLprojectImage.replace("%data%", projects.projects[project].image);
			$(".project-entry:last").append(formattedProjTitle);
			$(".project-entry:last").append(formattedProjDates);
			$(".project-entry:last").append(formattedProjDescription);
			if(projects.projects[project].image.length > 0){
			$(".project-entry:last").append(formattedProjImage);
			}
	}
}


/* Insert map */
$("#mapDiv").append(googleMap);

/*Remove malicious tags from inputs */
var charEscape = function(_html) {
    var newHTML = _html;
    // How will you make sure that newHTML doesn't contain any < or > ?
    // Your code goes here!
    newHTML = newHTML.replace(/</g, '&lt;');
    newHTML = newHTML.replace(/>/g, '&gt;');
    // Don't delete this line!
    return newHTML;
};
