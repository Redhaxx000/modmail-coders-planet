const { ActivityType } = require('discord.js');
const config = require('../config/config');
const logger = require('../utils/logger');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    // Log that the bot is online
    logger.info(`Ready! Logged in as ${client.user.tag}`);
    logger.info('discord.gg/vanir');
    
    // Set bot status - something clearer about DMing to create tickets
    client.user.setPresence({
      activities: [{ 
        name: 'DM me for support!',
        type: ActivityType.Custom 
      }],
      status: 'idle'
    });

    // Check for required environment variables
    const requiredEnvVars = [
      'TOKEN', 
      'MONGODB_URI', 
      'CLIENT_ID'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      logger.warn(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }
    
    // Display credit banner in console
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ModMail Bot is now online!                                  ║
║                                                               ║
║                    
║                                                               ║
║   Serving ${client.guilds.cache.size} servers and ${client.users.cache.size} users                      ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    `);
    
    // Set the status again after a short delay to ensure it sticks
    setTimeout(() => {
      client.user.setPresence({
        activities: [{ 
          name: 'DM me for support',
          type: ActivityType.Playing
        }],
        status: 'online'
      });
    }, 10000);
  }
}; 
