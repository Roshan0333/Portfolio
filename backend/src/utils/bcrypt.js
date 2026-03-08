import bcrypt from "bcrypt";

const saltRound = 15;

const passwordEncrypt = async (password) => {
    try{
        const hashPasword = await bcrypt.hash(password, saltRound);

        return hashPasword
    }
    catch(err){
        console.log(err.message)
        return false
    }
}

const passwordDecrypt = async (password, hashPassword) => {
    try{
        passwordVerify = await bcrypt.compare(password, hashPassword);

        return passwordVerify;
    }
    catch(err){
        console.log(err.message)
        return false
    }
}

export {passwordDecrypt, passwordEncrypt};