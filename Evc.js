const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const users = {}; // Store user data

const mainMenu = () => {
    console.log('EVC Plus Options:');
    console.log('1: Register number');
    console.log('2: Uwareeji Evc');
    console.log('3: Hubi haraagaga');
    console.log('4: Kabax');

    rl.question('Fadlan dooro numberka aad rabto: ', (type) => {
        switch (type) {
            case '1':
                registerUser();
                break;
            case '2':
                sendMoney();
                break;
            case '3':
                checkBalance();
                break;
            case '4':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log(' Fadlan Dooro number udhaxeeya 1 ilaa 4.');
                mainMenu();
                break;
        }
    });
};

const registerUser = () => {
    rl.question('Gali numberkaaga ("back"): ', (number) => {
        if (number.toLowerCase() === 'back') {
            mainMenu();
            return;
        }

        if (users[number]) {
            console.log('Number is already registered. Please try another.');
            mainMenu();
            return;
        }

        rl.question('Geli password: ', (password) => {
            rl.question('Geli lacagta bilowga ah: ', (initialBalance) => {
                const balance = parseFloat(initialBalance);
                if (isNaN(balance) || balance < 0) {
                    console.log('fadlan gali lacag kabadan zero 0');
                    registerUser()DKJL;'
                    ';
                    return;
                }

                users[number] = { password, balance };
                console.log(`succesfull register : ${number} haraagagu waa: ${balance}$`);
                mainMenu();
            });
        });
    });
};

const sendMoney = () => {
    rl.question('Gali numberkaaga ( "back" ): ', (number) => {
        if (number.toLowerCase() === 'back') {
            mainMenu();
            return;
        }

        if (!users[number]) {
            console.log('Number not registered. Please register first.');
            mainMenu();
            return;
        }

        rl.question('Geli password ("back" ): ', (password) => {
            if (password.toLowerCase() === 'back') {
                mainMenu();
                return;
            }

            if (users[number].password !== password) {
                console.log('Password is wrong. Please try again.');
                sendMoney(); 
                return;
            }

            rl.question('Gali lacagta aad dirayso: ', (amount) => {
                amount = parseFloat(amount);
                if (isNaN(amount) || amount <= 0) {
                    console.log('fadlan gali lacag kabadan zero 0.');
                    sendMoney();
                    return;
                }

                rl.question('Gali numberka aad lacagta u dirayso: ', (sendNum) => {
                    if (!users[sendNum]) {
                        console.log('Recipient number not registered.');
                        sendMoney();
                        return;
                    }

                    // Check if the sender has enough balance
                    if (users[number].balance < amount) {
                        console.log('haraaga xisaabtada kuguma filna ');
                        sendMoney();
                        return;
                    }

                    // Update balances
                    users[number].balance -= amount;
                    users[sendNum].balance += amount;
                    console.log(`Successfully sent ${amount}$ to ${sendNum}.`);
                    mainMenu();
                });
            });
        });
    });
};

const checkBalance = () => {
    rl.question('Gali numberkaaga ( "back"): ', (number) => {
        if (number.toLowerCase() === 'back') {
            mainMenu();
            return;
        }

        if (!users[number]) {
            console.log('Number not registered. Please register first.');
            mainMenu();
            return;
        }

        rl.question('Geli password ("back"): ', (password) => {
            if (password.toLowerCase() === 'back') {
                mainMenu();
                return;
            }

            if (users[number].password !== password) {
                console.log('Password is wrong. Please try again.');
                checkBalance();
                return;
            }

            console.log(`Your balance is: ${users[number].balance}$`);
            mainMenu();
        });
    });
};

// Start the application
mainMenu();