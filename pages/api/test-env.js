// Test endpoint to check environment variables
export default function handler(req, res) {
  console.log('=== ENV TEST ENDPOINT ===');
  console.log('Checking environment variables...');
  
  const envInfo = {
    OPENAI_API_KEY_exists: !!process.env.OPENAI_API_KEY,
    OPENAI_API_KEY_type: typeof process.env.OPENAI_API_KEY,
    OPENAI_API_KEY_length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
    OPENAI_API_KEY_preview: process.env.OPENAI_API_KEY ? 
      `${process.env.OPENAI_API_KEY.substring(0, 10)}...${process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4)}` : 
      'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    all_env_keys_containing_openai: Object.keys(process.env).filter(k => k.toUpperCase().includes('OPENAI')),
    current_working_directory: process.cwd(),
  };
  
  // Try to read .env.local file
  try {
    const fs = require('fs');
    const path = require('path');
    const envPath = path.join(process.cwd(), '.env.local');
    envInfo.env_file_exists = fs.existsSync(envPath);
    envInfo.env_file_path = envPath;
    
    if (fs.existsSync(envPath)) {
      const fileContent = fs.readFileSync(envPath, 'utf8');
      envInfo.env_file_content = fileContent;
      envInfo.env_file_lines = fileContent.split('\n');
      const apiKeyLine = fileContent.split('\n').find(line => line.trim().startsWith('OPENAI_API_KEY'));
      envInfo.api_key_line_in_file = apiKeyLine || 'NOT FOUND';
    }
  } catch (error) {
    envInfo.file_read_error = error.message;
  }
  
  console.log('Environment info:', JSON.stringify(envInfo, null, 2));
  
  res.status(200).json({
    message: 'Environment variable check',
    ...envInfo
  });
}

