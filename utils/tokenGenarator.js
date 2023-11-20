import jwt from 'jsonwebtoken';

const generateAccessToken = (response, id) => {
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign({ id }, secretKey, { expiresIn: '1d' });

  response.cookie('token', token, {
    maxAge: 86400000, 
      sameSite: 'None',
      secure: true, 
      httpOnly: true,
  });

  console.log(response.id, "from tkn Generator man ? ")

};

export default generateAccessToken;
