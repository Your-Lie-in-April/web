import { useEffect, useState, FC } from 'react';
import styled from 'styled-components';

const defaultImg = 'src/pics/default.png';
const Login: FC = () => {
    const [image, setImage] = useState<boolean>(false);

    return <img src={defaultImg} alt="Default Image" />;
};

export default Login;
