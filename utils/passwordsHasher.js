import bcrypt from "bcryptjs";


const generateHash = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}


export default  generateHash 
