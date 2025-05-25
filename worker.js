self.onmessage = function (event) { 
    const code = event.data; 
  
    let consoleOutput = ''; 
    
  
    try {  
        // Redefining console.log
        const originalLog = console.log;
        console.log = function (...args) //...rest operator,stores as array (nly tht are need to be logged)
        {
            consoleOutput += args.join(' ') + '\n'; 
            originalLog.apply(console, args); 
        };

        // Execute the received JavaScript code
        const func = new Function(code); 
        const result = func(); 



        // Add function return value to output
        if (result !== undefined) {
            consoleOutput += 'Result: ' + result + '\n';
        }


   // Restore the original console.log to prevent unwanted behavior
        console.log = originalLog;

    } catch (error) {
        consoleOutput += ' ⚠️Error: '  + error.message  ;
    }

    // Send the output back to the main thread
    self.postMessage(consoleOutput);
};




