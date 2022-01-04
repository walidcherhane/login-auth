

function ErrorHandler(err,openSnackbar) {
    switch (err.message) {
        // login possible errors
        case "Firebase: Error (auth/invalid-email).":
        openSnackbar("Please, Enter Valid Email");
          break;
        case "Firebase: Error (auth/user-not-found).":
        openSnackbar(`User Not Found, Check Your Enteries Or Please Sign in `);
          break;
        case "Firebase: Error (auth/email-already-in-use)." || "Firebase: Error (auth/email-already-exists).":
        openSnackbar(`The Email is already in use login instead Or use a diffrent one`);
          break;
        case "Firebase: Error (auth/wrong-password).":
        openSnackbar(`Wrong Password, Try again or get new one `);
          break;
        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
        openSnackbar(`We have noticed many failed login attempts,Though The Access to this account has been temporarily disabled. However you can request new password an login again`);
          break;
        case "Firebase: Error (auth/too-many-requests)..":
        openSnackbar(`You Are performing too many requests To the server , please hold on`);
          break;
          //sign up possible errors
        case "Firebase: Error (auth/invalid-display-name).":
            openSnackbar("The provided Name is invalid. It must be a valid Name.");
            break;
        case "Firebase: Error (auth/missing-email).":
            openSnackbar("Email Field Is Required, It Can't Be Empty");
            break;
        case 'Firebase: Error (auth/network-request-failed).':
            openSnackbar('Sorry There is a problem in the Network, try again later :[')
            break;
            // other possible errors
        case 'Firebase: Error (auth/account-exists-with-different-credential).':
            openSnackbar('Another User is Using The Same Email ! Use A different Account.')
            break;
        case 'Firebase: Error (auth/popup-closed-by-user).':
            openSnackbar('The Operation is Canceled by The User')
            break;
        case 'Firebase: Error (auth/popup-blocked).':
            openSnackbar('Your Browser Blocked Authentication Popup, Try again')
            break;
        case 'Firebase: Error (auth/phone-number-already-exists).':
            openSnackbar('The provided phoneNumber is already in use by an existing user')
            break;
        case 'Firebase: Error (auth/invalid-uid).':
            openSnackbar('The provided uid must be a non-empty string with at most 128 characters. ')
            break;
        case 'Firebase: Error (auth/uid-already-exists).':
            openSnackbar('The provided uid is already in use by an existing user. Each user must have a unique uid. ')
            break;
        case 'Firebase: Error (auth/invalid-password).':
            openSnackbar('The provided value for the password user property is invalid. It must be a string with at least six characters.  ')
            break;
        default:
            console.log(err)
            openSnackbar("Sorry: Unknown Error Accrued, Thats All We Know ");
      }
    return ;
}

export default ErrorHandler