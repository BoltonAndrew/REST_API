const jwt = require('jsonwebtoken');

const myFunc = () => {
    const token = jwt.sign({_id: 'abc123'}, 'stevewoo', {expiresIn: '1 week'})
    console.log(token)

    const data = jwt.verify(token, 'stevewoo');
    console.log(data)
}

myFunc();