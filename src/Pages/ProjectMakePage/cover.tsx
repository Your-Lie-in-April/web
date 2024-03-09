import { FC, useState } from 'react';
import styled from 'styled-components';

interface CoverProps {
    onColorSelect: (color: string) => void;
    onImageSelect: (url: string) => void;
}

const plus = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 2C11 0.895431 10.1046 0 9 0C7.89543 0 7 0.89543 7 2V7H2C0.895431 7 0 7.89543 0 9C0 10.1046 0.89543 11 2 11H7V16C7 17.1046 7.89543 18 9 18C10.1046 18 11 17.1046 11 16V11H16C17.1046 11 18 10.1046 18 9C18 7.89543 17.1046 7 16 7H11V2Z"
            fill="white"
        />
    </svg>
);
const CoverContainer = styled.div`
    width: 300px;
    height: 292px;
    display: flex;
    border-radius: 8px;
    background: var(--gray00, #fbfbfb);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ConverInnerContainer = styled.div`
    width: 272px;
    height: 276px;
    padding: 8px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 13px;
`;

const Register = styled.button`
    display: flex;
    width: 82px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 40px;
    background: #633ae2;
    white-space: nowrap;
    color: white;
`;

const ColorContainer = styled.div`
    width: 268px;
    height: 62px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 20px;
`;
const ColorChoose = styled.div`
    width: 268px;
    height: 30px;
    display: flex;
    align-items: flex-start;
    gap: 4px;
`;
const Color = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    &: hover {
        cursor: pointer;
    }
`;

const ImageContainer = styled.div`
    width: 272px;
    height: 148px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 20px;
`;
const ImageChoose = styled.div`
    width: 272px;
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;
const Image = styled.button`
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;
const colors = ['#633AE2', '#FFCB3B', '#64AFF5', '#C2D57A', '#EB5757', '#212121'];
const urls = [
    'https://s3-alpha-sig.figma.com/img/1428/5f05/043a78e2fa12ac2136b1383ece3b805c?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dtK-wfzGTlsj~sQidsbTULkBX8gQq2YK1PYYad~4zSuM6RIAPGfk1Bd5FXVwRJmZuqsmedy8sfQEPpFR4j5Z8tCHvCpNDbN-qflkEc2K4TJJGvodeSQkIZtMoc0K0fX5eU2rc-KEuMwwnFfrSFuZqHxmnEr3yiDEJFr8YlD3tdzVJO6SjHpOJqs5Emehq7lWQD79PNyqLQ24ALQbmBIGkz3FSkzicgSs77-o4WBoXSWYIcGx7uYzU3cd-eQyuSSflhFTgr78ROWYu92tUvPoM6JyjiEtDnACTLSWM-MmKGH45hEGomVH1yfDhygNo7q-erFQoaj~WWvggUxipdXqwQ__',
    'https://s3-alpha-sig.figma.com/img/efb8/74df/f4f778f0a5ad5ba05f81b2233e6fd797?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dGDS4Fht6aRooxbHpl6Jj2TrWylbRb1Ef4lnV--lQL9nlAq2fjoQacrct1eISZCCkWYEapTaX8ThD0mP38NR630iH7GWUf5IX5mZVbTCd~ImYJp7c8EqMWdxXa5s7P5zohmA~xelnmjg01TVqcbpfaJfPRKkd3dHE70z4Um-OW-xBHPuhv85dsdnjAdt1l7BbZcTwSaXt9zkAUaVLL2kQOBZLX34rLriYFt8el0i0KB9QiIPxYLZt-29VNVB4u6j5HdQSc55mvKPjv~Il0ON5VuhZG9ZlWR11idaCFix1c~-eFGqqV7PGj5TckrdFA0OQaTMtFR9P2Y5x1oxwrMWlg__',
    'https://s3-alpha-sig.figma.com/img/2fbf/dd1e/fcd0bb21cb1fc00fc7279925a32d87cc?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N~kP3gfrSUy8FGawfzDvuxeolo0FnyUFATDbWw7rVHRjgUOmhtYiPTP6uYasWjDMlfbmZLYBvsnwgz-2Q7aYhDCX6ZCO3plh3qvk7XYOgLw1cTgrvI9ti7kHaFjhdAMrOMNNmP0QJgicCrNqsDIUXaD01lDKfWULIikODBKPuipZmox2GhRtNgE5Gk-Gz~Pzg~U~VA1s6wzi1wKFv1y5ZluG5U0kqd0ez5mKAOkdRpDMqfIm8EwiyUaFed1Paz3K5GbgwItxETSucNC9rDBsUxqYDNkJc4Ski-0SKxWXtbkbN8~JQp9FAO~lI0LXGcj-9PyB3srJaZLeTddVGX5-4w__',
    'https://s3-alpha-sig.figma.com/img/58b0/57ea/8e0718d71dbaabb5992ff6d5bb08446d?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BcXY8xQ8wvqj7PtcEvA0oIxtMqmDiqKjuWB6BQzYaWBc7li8YUf2O~QejVzqSi7QstfSefLQGVkJVrHiquBM0JpkXMZVI2fV1VaUIBGVtZukYH87YT1a0PIyW49-SChthJHM2TO9zyDr5NuuuPq5Sl~poa51-tOgPd-~cnxk1NlsVM16vjtHt2RpI98OP6CgCzpjl3heF7MR5tIfgDhNEkWRj~Xrpyo9MU1zKEvEyl1gy~x8qZLa9in4XJ9Zvjf9kRONDcjR7gX2~Wpwdgr22MUPHlOi8gkjMomcvwTz3rQRwjDpewR2mH9uq5Q3tXPo2i72Y4NTtKgDSTUmPWTYiA__',
    'https://s3-alpha-sig.figma.com/img/1a2d/e314/db589dfb0a2d5f1ee6b02b85690f03b1?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jYhrzMm0pOf3uDpxfZy50sd2-yCFu1TsZ2vWTAzVGCVO8fAe5oN05urs1y1jCWXup5suGyOXG8i1bhBZiqtg0psq813A0ny367e06ekkRwQE0wdL8GLpa6UfY6OEeK2CAOwsrqvmDkFwW5nDF~AFBfmlhQUxs2fOwnoPDNq-tvPew0ZV6i4BxB-TB7Yor7dsc8EFjvB7QefZ-k8dhI9AtenOqE81931aC-lBhszq9lzBPuPFZc8R7KOWzJM92-y6yXT4cAymZ~Hp2H11-Yq1qgHYLAdJYFq~e6NbR59wrhQf-7brrUn-acfF246MGyRogdgGk2SLnQCu-eHiR-ZMjA__',
    'https://s3-alpha-sig.figma.com/img/7107/8111/d29686da31b512dd3411f02c330a0cc5?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aLpW~Qi~8tKfviROdsZPX6-wmpFG-KZbnsO3QGEiWL~BPmujCdIkOy5pbdWa8HfVeowx~3gcBwzkd9rPS4ZqS5A6zqIi7yVIeq6Yn9V28EZngBSE2e1rw-fh-C78ffBLm9yV2xnGnN5YWgqACAWnmAXGtNmN~QzSY1V7OchuabnLpTFTejfw6ZsGQv02G3xMXDI72w7z5V1nKXgcTP7QZUEdY3BSEsdFefesq8iQ-65xTptflxYa7OMQUXGh5NWh2m0pJlYzW~NjPPNikLcqVtbsurIPVT4HzXqI34HF1y2kJHeNgdArqApk21-Qbgt1CgBucmn-YpaS~jA5wlaW5w__',
    'https://s3-alpha-sig.figma.com/img/ba52/05ec/3b22fab4a744b5cb3f32d4eb5ad0478a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H26a-nId7d5kUppvKnkqm1V8f6A7RWcJxakuPHP10evly8X62xyPAjbtrQTGsRgVmoeu63maEosnpnEemT8hchV94NamSodrfPjykDgd-RxZeo8mZmrMFJAvbjzPtXFnHesO7dCYqoH9TCoBPxlZjfXUEFfqhZaUAqquFNekAEpgeY-wQRqC8joS0KH0MTpvaEJ~KzyNw62GZaO3I3TSKMAxCILxneAEG2CxJY4kTE9P5jB0xzV5RziCMna5YXIcFjsJZzmtZBCPNJ8oq~ownzOJeZLj0yjEtNhYiGroht6LaTZpOgNOQPDg2bakQ2aPjv5-BTrOzRZrqa-bVJG09g__',
    'https://s3-alpha-sig.figma.com/img/bf79/fd16/4496947b340c6bb18843cfe05dfbacb4?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MVljuOxZgela4n8GNnlTGw9sneN86CCeDytoAd~Wj23FVXWbL0mcCP5r0QR2SXmlQhzWRyp7lq4RwtIG9yj7a9LOrsI3DZOAgwZs0A4GjlYD5pljbS2VjUZ3MGjkEyFt2WTImnaco-FwcywG9-D4GSo6eFZPsFRMj~Od0blmqSiQtUX2eVB8Dll7yCRfU5aZu-g8FCY8cqjBbjTKZiURngHmM2q8RdWLVQsSj38tOZ~ugqwdXI7uc8OgRo03~pIB749LCMoEwpI-fySuhFY20PqBnPCT-sbO3x112GRBctoNZpIcZeDNLbRJiDZv7uIa3HhdsO4WJDl74YLsZHeZdA__',
    'https://s3-alpha-sig.figma.com/img/07a1/769e/b0ad8c6ed312fa282298d47756028b4a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kFsT1NCgUdmzdJwxlr~0L6qW1K~3I7da3XbP2f9uQsyD4VloW9cGXSK2I2myEfNJUp544VsRx86QFTifexpxQggzrkUh5w7s9PW2DURhrxGAE6HQvWaNaM-CODknu6h2hBQ65rldxf1vqy8gXvXuwVLkIaKT3-PoE-9bI~4gpe0ogzYEbWMDd-BPonb7lrEM1ycrBb3bZndpwZ6tNo-4T14R4IcJSRXk~b73zjVRZZ9WmlVMVG9INnQm0jjAsJ~kXt4lfppwxMWA8UdHJg3-oMI1GUgKDxyuzT4g2p2DwciSFsLDhERdVcSIvZG3rDZqA03A6eQPo983ASRG50as5w__',
    'https://s3-alpha-sig.figma.com/img/9d99/2209/8e9be0fcc8ed0d00ede564ec9eb28549?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YuJwHNYWqCbmPfQjamXGFye6oNa9HKhRULZ4WS8bbi-reuSOobQJeeXGf~Gpwzc6j8MM7NW~HzgzT9SzG~s02ATdspMuDPi4LDJq23km7kCb6eo14YYkdEnRTrWVCprG8jrsCogv-CJqKFfc3F2UAeOto6vLEyC0GRPNKKlE~KxLfYw-EjZv51RHiIy-YXyCthsGz5QQ3s4mTL8EZCSWcR9Hg0jYkll4hRmxfNQV8IP5ZO-tplE0oOwKh3oJRpzwER8PZ7Gu8rg0FXBUE6h9ZFXbOyunJuNmvZupzZuQAkTolCETn5FqPvocMXqYG6VDK1c8aUZDJlXH8fBNikIoRQ__',
];

const Cover: FC<CoverProps> = ({ onColorSelect, onImageSelect }) => {
    const handleColorClick = (color: string) => {
        onColorSelect(color);
    };
    const handleImageClick = (url: string) => {
        onImageSelect(url);
    };
    return (
        <CoverContainer>
            <ConverInnerContainer>
                <Register>커버등록</Register>
                <ColorContainer>
                    단색
                    <ColorChoose>
                        {colors.map((color, index) => (
                            <Color
                                key={index}
                                style={{ background: color }}
                                onClick={() => handleColorClick(color)}
                            ></Color>
                        ))}
                        <Color
                            style={{ background: '#FFF', border: '1px solid black' }}
                            onClick={() => handleColorClick('#fff')}
                        />
                        <Color style={{ background: '#D9D9D9' }}>{plus}</Color>
                    </ColorChoose>
                </ColorContainer>
                <ImageContainer>
                    이미지
                    <ImageChoose>
                        {urls.map((url, index) => (
                            <Image
                                key={index}
                                style={{
                                    backgroundImage: `url('${url}')`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}
                                onClick={() => handleImageClick(url)}
                            ></Image>
                        ))}
                    </ImageChoose>
                </ImageContainer>
            </ConverInnerContainer>
        </CoverContainer>
    );
};
export default Cover;
