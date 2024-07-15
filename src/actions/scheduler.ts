"use server";

export function scheduler(){
    var cron = require('node-cron');
    
    try {
        cron.schedule('*/20 * * * *', async () => {
    
            console.log('')
            console.log('######################################')
            console.log('#                                    #')
            console.log('# Running scheduler every 20 minutes #')
            console.log('#                                    #')
            console.log('######################################')
            console.log('')
    
            // Perform your action here
        });
    }catch (e) {
        console.log(e)
    }   
} 
