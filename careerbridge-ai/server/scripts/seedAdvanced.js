const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Company = require('../models/Company');
const Job = require('../models/Job');
const GovernmentOpportunity = require('../models/GovernmentOpportunity');
const ExamSyllabus = require('../models/ExamSyllabus');
const Source = require('../models/Source');

dotenv.config({ path: '../.env' });

const mncNames = [
  "TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Accenture", "Cognizant", "Capgemini", "IBM", "Deloitte", 
  "EY", "KPMG", "PwC", "Amazon", "Microsoft", "Google", "Meta", "Apple", "Oracle", "SAP", 
  "Salesforce", "Adobe", "Cisco", "Intel", "NVIDIA", "Qualcomm", "Dell Technologies", "HP", "LTIMindtree", "Mphasis", 
  "Persistent Systems", "Coforge", "Genpact", "DXC Technology", "CGI", "NTT DATA", "Zoho", "Freshworks", "Flipkart", "Walmart", 
  "Paytm", "PhonePe", "Razorpay", "Swiggy", "Zomato", "Meesho", "Myntra", "Siemens", "Bosch", "Reliance Industries"
];

const jobTitles = [
  "Software Developer", "Java Developer", "Python Developer", "React Developer", "MERN Stack Developer",
  "Full Stack Developer", "Backend Developer", "Frontend Developer", "Data Analyst", "Data Scientist",
  "Machine Learning Engineer", "AI Engineer", "Business Analyst", "QA Engineer", "Automation Tester",
  "DevOps Engineer", "Cloud Engineer", "Cyber Security Analyst", "UI/UX Designer", "Product Manager"
];

const govExams = [
  "UPSC Civil Services", "UPSC CDS", "UPSC NDA", "SSC CGL", "SSC CHSL", "SSC MTS", "SSC CPO", "SSC JE", "SSC GD", "IBPS PO",
  "IBPS Clerk", "IBPS SO", "SBI PO", "SBI Clerk", "SBI SO", "RBI Grade B", "RBI Assistant", "NABARD Grade A", "SEBI Grade A", "LIC AAO",
  "LIC Assistant", "EPFO", "ESIC", "RRB NTPC", "RRB Group D", "RRB JE", "RRB ALP", "India Post GDS", "ISRO Scientist/Engineer", "ISRO Technical Assistant",
  "DRDO Scientist", "DRDO Technician", "BHEL Engineer", "ONGC Graduate Trainee", "NTPC Engineer", "GAIL Executive", "BEL Engineer", "HAL Engineer", "Coal India Management Trainee", "AIIMS Recruitment",
  "CSIR Scientist", "ICMR Technical Assistant", "Indian Army Officer", "Indian Navy Officer", "Indian Air Force Officer", "CAPF Assistant Commandant", "CRPF Recruitment", "CISF Recruitment", "BSF Recruitment", "ITBP Recruitment",
  "SSB Recruitment", "UGC Recruitment", "FCI Recruitment", "BSNL Recruitment"
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerbridge');
    console.log('MongoDB Connected for Advanced Seeding');

    // Clear existing
    await Company.deleteMany();
    await Job.deleteMany();
    await GovernmentOpportunity.deleteMany();
    await ExamSyllabus.deleteMany();
    await Source.deleteMany();

    // 1. Create 50+ Companies
    const companies = [];
    for (let i = 0; i < mncNames.length; i++) {
      const name = mncNames[i];
      const website = `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`;
      companies.push({
        name,
        industry: i < 35 ? 'Information Technology' : 'Various',
        website,
        careersUrl: `${website}/careers`,
        isVerified: true,
        lastVerifiedDate: new Date()
      });
    }
    const insertedCompanies = await Company.insertMany(companies);
    console.log(`Inserted ${insertedCompanies.length} companies`);

    // 2. Create 100+ Jobs
    const jobs = [];
    for (let i = 0; i < 120; i++) {
      const company = insertedCompanies[Math.floor(Math.random() * insertedCompanies.length)];
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      jobs.push({
        title,
        companyId: company._id,
        company: company.name,
        category: 'Technology',
        location: ['Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Gurgaon'][Math.floor(Math.random() * 5)],
        experience: `${Math.floor(Math.random() * 5)} - ${Math.floor(Math.random() * 5) + 5} years`,
        skills: ['Java', 'Python', 'React', 'Node.js', 'SQL', 'AWS'].sort(() => 0.5 - Math.random()).slice(0, 3),
        description: `This is a demo job for ${title} at ${company.name}. Verify the current opening on the official company careers website before applying.`,
        applicationUrl: company.careersUrl,
        sourceUrl: company.careersUrl,
        isDemo: true,
        isVerified: false,
        status: 'Open'
      });
    }
    await Job.insertMany(jobs);
    console.log(`Inserted ${jobs.length} jobs`);

    // 3. Create 50+ Government Opportunities
    const govOpps = [];
    for (let i = 0; i < govExams.length; i++) {
      const title = govExams[i];
      const org = title.split(' ')[0];
      const officialWebsite = `https://www.${org.toLowerCase()}.gov.in`;
      govOpps.push({
        organization: org,
        title,
        category: 'Government',
        location: 'All India',
        qualification: 'Graduation',
        ageLimit: '18-30 Years',
        officialWebsite,
        notificationUrl: `${officialWebsite}/notification`,
        applicationUrl: `${officialWebsite}/apply`,
        syllabusUrl: `${officialWebsite}/syllabus`,
        isDemo: true,
        isVerified: true,
        lastVerifiedDate: new Date(),
        status: 'Open'
      });
    }
    const insertedGovs = await GovernmentOpportunity.insertMany(govOpps);
    console.log(`Inserted ${insertedGovs.length} government opportunities`);

    // 4. Create Syllabus for a few Govt Exams
    const syllabi = [];
    for (let i = 0; i < Math.min(10, insertedGovs.length); i++) {
      syllabi.push({
        examId: insertedGovs[i]._id,
        sections: [
          { name: 'Quantitative Aptitude', topics: ['Number System', 'Percentage'] },
          { name: 'Reasoning', topics: ['Analogy', 'Puzzles'] }
        ],
        examPattern: 'Tier 1, Tier 2',
        totalQuestions: 100,
        totalMarks: 200,
        examMode: 'Online CBT'
      });
    }
    await ExamSyllabus.insertMany(syllabi);
    console.log(`Inserted ${syllabi.length} exam syllabi`);

    console.log('Seeding Complete!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
