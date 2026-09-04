const getCareerAdvice = async (userProfile, question) => {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (process.env.AI_PROVIDER !== 'mock' && groqApiKey) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${groqApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "qwen/qwen3.6-27b",
          messages: [
            {
              role: "system",
              content: "You are an expert Career Advisor. Provide highly actionable, concise, and accurate career advice. Format your output using clear markdown with bullet points where necessary."
            },
            {
              role: "user",
              content: `User Profile Context (if any): ${JSON.stringify(userProfile || {})}\n\nUser Question: ${question}`
            }
          ]
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        let rawContent = data.choices[0].message.content;
        // Remove <think>...</think> blocks from models that output raw reasoning
        let cleanContent = rawContent.replace(/<think>[\s\S]*?<\/think>\n*/gi, '').trim();
        
        // Sometimes models might just start with <think> but not close it if truncated
        if (cleanContent === '' && rawContent.includes('<think>')) {
          cleanContent = rawContent; // Fallback if regex strips everything
        }

        return {
          response: cleanContent,
          isRealAI: true
        };
      } else if (data.error) {
        return {
          response: `API Error from Groq: ${data.error.message}`,
          isRealAI: false
        };
      }
    } catch (error) {
      console.error("Groq API Error:", error);
      return {
        response: `Server Network Error: ${error.message}`,
        isRealAI: false
      };
    }
  }

  // Fallback Mock Response
  return {
    response: `Based on your profile, answering: "${question}". Here is some advice for your career path.\n\n*Note: This is a fallback mock response because the real AI API failed or is not configured.*`,
    isRealAI: false
  };
};

const getJobRecommendations = async (userProfile, jobs) => {
  return jobs.map(job => {
    const matchPercentage = Math.floor(Math.random() * 40) + 60;
    return {
      jobId: job._id,
      matchPercentage,
      reasons: `This job is a good fit because it aligns with your experience level.`,
      missingSkills: ["Cloud basics"],
      recommendedSkills: ["AWS", "Docker"]
    };
  });
};

const getSkillGapAnalysis = async (userProfile, targetRole) => {
  return {
    targetRole,
    currentSkills: userProfile?.skills || [],
    requiredSkills: ["Java", "SQL", "React", "Spring Boot", "REST API", "Git"],
    skillGap: ["Spring Boot", "REST API", "Git"],
    recommendations: "Focus on building RESTful APIs using Spring Boot and manage your codebase with Git."
  };
};

const getCareerRoadmap = async (goal) => {
  return {
    goal,
    roadmap: [
      { month: 1, topics: ["HTML", "CSS", "JavaScript Fundamentals"] },
      { month: 2, topics: ["React", "Git/GitHub", "State Management"] },
      { month: 3, topics: ["Node.js", "Express.js", "MongoDB"] },
      { month: 4, topics: ["Build Projects", "Resume", "Interview Prep"] }
    ]
  };
};

module.exports = {
  getCareerAdvice,
  getJobRecommendations,
  getSkillGapAnalysis,
  getCareerRoadmap
};
