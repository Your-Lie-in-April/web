import { FC, useState, useCallback, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ChromePicker, ColorResult } from 'react-color';
import { ProjectEntity } from '#/Types/projecttype';
import { Http } from '#/constants/backendURL';
import { useNavigate } from 'react-router-dom';

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

    &:focus {
        outline: none;
    }
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
const HEXContainer = styled.div`
    width: 300px;
    height: 478px;
    gap: 8px;
    border-radius: 6px;
    background: white;
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
    margin-top: 8px;
`;
const colors = ['#633AE2', '#FFCB3B', '#64AFF5', '#C2D57A', '#EB5757', '#212121'];
const urls = [
    'https://s3-alpha-sig.figma.com/img/1428/5f05/043a78e2fa12ac2136b1383ece3b805c?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M3ntrL8DfrFbmumQgCKrlg3oUpu2ek2~CRQ0p~YoWuMLNolGDMLFt5K3mYnDR51ePGVP6BiF3ErD5lQ3Dy73z7dZJXkae3kfhHqxEB9wEPwaGYR-SFK6JF9tTmLbAPucfPfXx~mY9XQqJjET-9FnHlosOEJUxsOG6oaV7BLkoW6yQIGnCdN3Z7632r-egffAjaFYPjnjWckV4M3QA2fxWPDIxMTWk7KeZRPRw6PX9ex7~-nzkaKEVbCeljSut98EXDSkmwZ8CHsN9MQrsXv6xkRXiC3-CLuNhCdOZWl~MeWvkRQqKpexGKrK6xpsEK-jcUuotxYd4N-hIQa84XDMJQ__',
    'https://s3-alpha-sig.figma.com/img/efb8/74df/f4f778f0a5ad5ba05f81b2233e6fd797?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Gjo2BbRHGO9ZrhwvAhQ41gm1pHLYU0gqqhZFYkH3JyvgfRmvLffd-~fxsqwJb4LyPoOqwZVq4Bm9gSsdMkud4wsJGV0ZI5PG42oFrK2D9OuCR8RQygT~QIyYkzByuIEkHyOmeVLFl-MuEnWKiCACpSHL94zShGZ4WMFHho0LiKLzusPTQx8Lfm~PBTFFoxlYqqSZ6N~LtKH5Q54qsyAe-wUcxoAQ8wx30hG8QSfIZo3uFjc-oTE1HKvuhn0lgnTX-liWecluvRMmiyHK7-jYWY7EtmNheeyGT3l3g0bV~9qunhGjoShKrASPyX2ynvCSWiKcc4k-Wwz5CjqlfHih-g__',
    'https://s3-alpha-sig.figma.com/img/2fbf/dd1e/fcd0bb21cb1fc00fc7279925a32d87cc?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ihc3oVnKpfRQ49V~mHs-B3fSnB4WZhI3UD27bBnpozG9n-bzSD~s2WqATwRvLClkGXib54E67jf9DBhWNqcTF~VQiJvG5NshRRtkhI0q8U0D9-w5ObMxQuKAo1gT3z2HFTS7z2EnDbp4zS6AnV73ctV2Z2GjEz20~h2UeC5Bhr0Qn9Tdtrl9c2ZmLWTL8TVolwkVMBwqCJdlxmG2v59pElpLqQjH003mMGTfdvYIG1ecfwmpNCZAZkLrZyvZLFqCswzJ3sHEwBenWEG-omV8yLhqnWxvCpRpNnKsoPh7QqXJMZHA4-sRZE6T1E~uea7xRMa8mdUhMwFz2kl91jOXyQ__',
    'https://s3-alpha-sig.figma.com/img/58b0/57ea/8e0718d71dbaabb5992ff6d5bb08446d?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ppBkk2F62wDnc0avRaIbn0jF5RVgOH6MherFidiJriec70EIlIbiyHKhD5EGgwYzvvbYIn4YCjFuxsYAjUzCaM17Z~lNaNf3a5mZ3MI-WJzOuTUdEXrI5oHAIYNN6GdpBPzEdm2GIJfYCyA--SadMy6hhsvj8PKN6JasTEb3rpuKNuzHnAadvIvSpu0yTj~YcB694nIMW6HyLDtpYuqV0wZE-fZfzUAAkUJ9czh~olQuOaWKL41LokZ6OSbczKEYZfldxi9617e80zJb2GL3vbx4ivDfCi0Gjbt9InIm1wRnltt8r0W97ONUfv8hpNg4K7tAi6r0E-p~2plh6zm4Kw__',
    'https://s3-alpha-sig.figma.com/img/1a2d/e314/db589dfb0a2d5f1ee6b02b85690f03b1?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z0Jl53h55MnoSfnu31Rydrw3ofxCyVP~HLNI2coPDYE9kWBRkYDxCgOvqlhCqMSM3NULRhefTVS2d2GwswILbTT1uWugEagrNmxb4tYw5UfrYoG5gKslksQJgZ1lQpBY0TcXau0M7Svl~~EEh7PkLALvFHSRKPOD0UnHwemhVaPOZvHepkHtg592L80WYmnMm45K3AcY7Pw84OT0LfpLbOwIO1vCE9ULq4oI4GLv-HzJZNhRbt1cdkGR0wAXs1vhnubNX3x2zui2U1zw228eekNXk88lcVFNKcYnI1uO9tD0Nx42aRxuFJ3taUi-qaEf6Xz9sRkF25JiYRr718plwg__',
    'https://s3-alpha-sig.figma.com/img/7107/8111/d29686da31b512dd3411f02c330a0cc5?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JHRtmp34KkIHTvw4dJz6b08xfeNU4h0CAJ~Z6PnUEs7T~4AHH4b6BvsA1DUAnX~D~U9~SVEEz9MmDDvVTgUTTA0-gM1Sz1osjoiX83UkokmigJOieJTqKbWEYgTgeHgtMH2EJJX7HqT7zK0Wgd5kntR~2hRF-qusfOvPf67e1uVx2vh6gA344c7P4j-oLBfq7ZgcLCdSETpuKY8d9WDRmChZZv88Zjhtb8URjcgInZgTWkFkRtTiG~hu8hDlFnbxVJq5~kxarrInYaG2bgfbmiKYyaD6Izdar-v6dTMYsPLxdZNCkWmmwKZ3gywtNL1I~FfGUFHNhO~q9rTD-TSmVg__',
    'https://s3-alpha-sig.figma.com/img/ba52/05ec/3b22fab4a744b5cb3f32d4eb5ad0478a?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NWC10XhixP63DIG2wS3LyTJKoNc-XDd6rLH6B9pPWGnNJb5URaFPrH0qo3jMJjffXWdk68nBmVURKbREHp0EfSukMgwo5BvPr0JdTg9JR4I9X69OOkNwVqfn6~ONsFDVg~XFozW1tGhoanWKu3D3p8vBcK0krlttTUr65U~pC47LaTV5K1tmccFChcfdSwQEZsOhiMrubKq51BMhzWisYTm2edKgbVHIrq93Gp176l31Bz-2G9ksRescrVMJIohoVucRYQs7surLi4knTfXP8WvFavoRC3dDra4FrPPucMgHM1~sLFAjV70yCchTzY4Q~L~DKIBHBQuGW1-FjrcTPw__',
    'https://s3-alpha-sig.figma.com/img/bf79/fd16/4496947b340c6bb18843cfe05dfbacb4?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NaFv6tti3lu6X8mO9XJseDFX8yfR2ZNiqGYoietnrQk9cu3ZuXW-yF8E1Z53~pO6yfPThLCJ7u2PPWkYhnzxl7KrTAJEtILW6W4PYX-5ekvnn1X5aKKCKzL2mw1T9yiW6fx1Uu47SgCq-RiZmY1qQRHH0sxPDW-UC3I0e7ONTVsXg9Iqh25XHUgVUtbD0cNsV2nMv1w8UjDTI4Sw3pyy5MCZx98SPGHMVWgYPO7eceTE-NmInI6IxGWTkIY8-xS8kyohfgpwQfY612bmAk6HsgSHiDmlYpT~E~v6yanfVSnmkzYT4z5kscm7kEPckQxa5NOdmQ3DF9g3G9X8OVMIBQ__',
    'https://s3-alpha-sig.figma.com/img/07a1/769e/b0ad8c6ed312fa282298d47756028b4a?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=a7~5fvkE5wmaKhW6HXXfBD~2uLMmY40hRICkNOPcXCv6rOZb-9b7yRNhlpe~8G-C03C1~zUnU~wWKASFOt2p-qAwCM2gZPuX64zQl2onqF2tNUZIaBAlAx-UgGQ8aUYbYIX8uLCRM60Ewd1UqA8ACdAM6c6JP5J-iqIef35XREwy4ibH8Av1ox5LmkkuM1wGWdnxrrcVGKlaWaA6Fr9rVBP9AYKOdehC9XAbdXNzmE1v2xmFtOHqQZYJXF2cejosJ7eNW3ef9l9OQCQTRoVitaWx6zF7K4us3W-AFdu3ftz9kTVynr3wxe2LIPbCnSh8BF5I54tAPp~nEHctJXRmtg__',
    'https://s3-alpha-sig.figma.com/img/9d99/2209/8e9be0fcc8ed0d00ede564ec9eb28549?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L7aiUKgQQXNGUAPfl7xJfTaOx-oN8SyBa0bEVKViRPhVld-ucpQqa9uyVX23ygJNrQGHLw1ujYe-PFkSsBWw9Rc0nUvVuBgUYvPkQpLpFz7ClMUjRjWd-poWC~rkV1FLbKslUu4teaXekmW9QoEarnNkSYUVWLSQ12dbbvgGo5BODoePrtY5puOwpU0qg29on6kzI6lRFf59aNOA8sOImS5aaSp5v~v9ORjzpCN5wB2FDPU~HpkdkewwKsPkYS26k1fx5-4EMCtVg8B-iOiyEq4uRMHEZQlPRVcbPg0Bugdr6BU0f0AK6rtbun2kWEfRuZoR6kuMPXHK8i83gh2lJA__',
];
const backurls = [
    'https://s3-alpha-sig.figma.com/img/8198/48fb/a4ff19fdc12d82ff384e91143ed97900?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=djyiepAHHs5GZ~JiHAsJ80ZuqGetHaAnMahhtM-rHLdOoxn1XXRd2ZTJxXnwsFyXKg0g2PwvjSiBmntv~qP3Wdtf~NCznKjK4z6s7jy7qsowCOT4SbtScKk74JfwHjyUnP9b5JVrTaCEwxi2UzZCrrXl4CzwETEnS9oBqcqJJOD2TDAGMgf-CT2RLldirURmd1-KddzX-E4SXdnFfSuJveccghYO8d8zk22yeNRCl8GhXhLrJ2QT-P97kCVraKnTe44xAq4imRpKvITmo7m9MNcIUEXLyXnV3s7I95Dy5DtD6dBWhRxahj5DQIHFTeqsRZ39fIH-r1kKYfL0JyOiAA__',
    'https://s3-alpha-sig.figma.com/img/c0e3/c4cf/b566e4bfd743a97d9a7fdef8a7d68cab?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lvYFbnIrHoslDMp69jF6goXtCyoikgGsyQjNLpCz01XIJ~bIe7Fwb8-TL3wRY5-DIca9ZTR97WXCvAiWS7RUn581JmMPgeL8psU2XF1yG-8LA0Cqe8sAM2nODQAr7wO05SjzxXQ~r3kTCjlj7N8sA8wOvJ~QuXKj52j4uaFRnb~nj6rfU5PXH2DfpzlvMlYjodImc2ODMS0UDevUFs9nO6HUsAGZpkH0C9b5v8xb1FUXQagWp~AegujqRDh3DhIP3ZqirQiYNuSa4BZl97jByjeLxNuyWQC33QD1iOrf98SMHpVAD2YSd6sclgVBby8r24QLUxevoTJ0ezRnzKcYdg__',
    'https://s3-alpha-sig.figma.com/img/105c/0d9b/d13953691cbae0f1c4c6f2379079bd83?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CRpcv9D7C-3V~taFlXRjYUYPw72Az6RFm0hzUPB6ENlnqDAk7n9cyd6fEL9uKyuu061uBb975B9uI16e1S4oq-dZq5qYMtiRs3lgTnAbLVSF1vcXOleVulhB6JefcXgVyY-TnsbkmolBoRw-fmSSpZOp0Zp6RkppejvW2U0Omq9~GD~joKJbSBZTg7URppNXnZrwRKacdUdLGE5cte~3MlZeMvlt-yvUSd2DUgyTU2jP2WVPSkudesPfMPbU1zZ2eIFng1myTE1J5dR65B17JvvIevpfXxFd-C4ZeGCdE-OPNwsMjQdx1KMF2JMWfHMGpopbqDIsSb4Z2WCd9a47jQ__',
    'https://s3-alpha-sig.figma.com/img/210c/4712/a5cfb086784400fc9eb56d64ca225961?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QQWls5wbrkZsRFjfbWAzt1ge-pA51oAhfx-mS7q7nwRR3LdJrSg4VAbMcQ2cvZ~0mPu9k5QZttZP8SWOIVsILmrr9-9KzZ4Ywo~YavSKYdSZs4vvhm2fo4A01PUDKOtA5GfCqsL9l~2t4WrtNG8bnSRoRGF8uefDZ-eaVBWkH~Q59r5CPSeonhImquLEH0zTsKW6SGH1bKotL~VFxul9-tCRP0hX-gyfKwd1x8z7Xb~1xl7AhClkKsuftggvb01A~8ueR6BTpSoImmi~xFXZl~zLF8V0OkuHZJ919tQNugNrE3l-gvBZF9u8yP5G50LpO3f3GyZ5HL~EG-Tty4j24w__',
    'https://s3-alpha-sig.figma.com/img/0810/c136/63c2a535540b9e0f2e82e3bca348209c?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k~NBMC5FdU6~eJvK3Mz0RE6uBjCZ6RUIjAEvKGwd6rPHt3AKg8EwdZyyls9Kdu9isrcSVXB3KGLFoR576i42Doxd3I1kczCENlQyIgvwQXxZzDK4rAW4oV~~ed3XTAexAf~lwYQDE25Xey60vn2bMd9-Hvz3h4iAn1bLkSa0vgJF~TB0u74~8Dhwm6WCmM5BUbSAje0TxLqahkmOo903aIhIAigJNm1sQjiCdQkQMg9Brkobn-oVexb6N~IkBgFzCi1WH8WztHPmfuUWGA0EEC7Td~Dc2kGAYVr7l98M6QEewhmksA7ILHuxXqcS5s-6FCzES1xGgcAOQ6C358X45g__',
    'https://s3-alpha-sig.figma.com/img/eacc/4340/d1b342dcf6d83a071d7f657655fc453e?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UpuNgYXKVrS2pKyPY9d-l-MUoRg6aavyzZOfTrNUNPl982V~ZSbuRqayUn70GL2-8eMGQTRCxgB7UnZa8Ar~~-w3gzdNk3QvuLhG7XfQM03qaQRMrzCWtEEKaGWDdumKwdLiCHWIvpgZsP0Tgn4i7B0vPC6eqY9usn-E792O0yzdKT~muffdgrREnIU63KndhT1VjLhlNmMWO1Q9dnhamXAQyN~tk8~4GOdTeOivdEKKuOuPMDyZFZU3-ZDFWlFjg29eoTfyBoUrMQwl5NcQRZ4If3MMCP-9AEc3UW4jsj1cVDz-Sbky11EirB9XFycleyfd1xPIoBJWaUhLkx2Evg__',
    'https://s3-alpha-sig.figma.com/img/50c8/60d7/133f89a6971170a19026a2df443b533c?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f5OADkdhKbLPc7q3RtqYCunaqmpUqXW6FSInF5ihgaOvEOvhPyX~ZPr2WTSOPOFVrt0yfyiy-lZqOBfZsdq0wSJyQ0R4wwcAq6YNnHoMc8Ov04tXBSpNS1xU9dhW4MZp531XH77ci8WiaCux99PrGpzML03WDAydwCnn0zOpTWDAGOZxZMCcx~dALh2GCUsGRBdwjdprp516XYoCog336hMDcecbbwkXST5W0U4zAdr4P6Z~Zn3m~hmzZWZpl5zSzoHNFqVc1RKqIMNMDhm4~GlYnEsjH1nt2r7OuBfiTPQlBMJ1RLL20vExO6FMw28L1oqjyjvA4k692DyWBB3OBg__',
    'https://s3-alpha-sig.figma.com/img/0e17/953b/92848b9243bf1d1ecd3728f26ce6dc78?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V-UcPWaMrAH20Jdltc0SrxKPaMSCXGwZTq8ZCAj5wLAN1FlwJfGbiXLWlCMgjCuS4jpql1hFgWauxls5Irq-P1j3nIW-22vyakl6x7ZwjHcYjgZSHJqIEeNRFB~mDvNnem7MYc1e9d1t4AFOMBL0T-6JltFH9Csgp2si34yByWkG1Qeli1Scz0njhYdYUl-FAo0ye24vuEikwysznircufJ80l3BEOFiVOYahbcqlKuQzUQlAnxhHCBm5-Mb7~MJUM8tPnVlyRjoLuVjsBSZslXCN1xt5FDX8cKaRVJ-7UWqsWh4hYCERggyGem69UGs12Cqp8t1Ffdrp8DjsHd2eg__',
    'https://s3-alpha-sig.figma.com/img/f242/5429/7d8bf83785b22f83c7ba791f4b46f02f?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EukvuJFh7976SizeJV~6R4dot8Hc6rcsMneGrnOncravvSk581B2rO8BG2cyJwZiVZ556oP4hNp0s92c1pe1m-JCrVxJ5q00yzzAPq-J8Hkj~XWPL1SrlKyt4QisegRg1MplmY1cMSueqWm3sU0qVmUaOPzlaAHWbZiu3TELsjZdTVBS8irrATTvBY44skGIFgXo3LPKk4Tg2pjZ2BV0qM1OVDHcJ7VK~In4RE6OhnT1MJ93~ExY6xM11uPYQD7ytm-LX9DIKPHwMA-RWP~Bo2VvxdsVMB6O8IWSWnwEAZexd~xzSXVLBykmDtnWui7X~al9Sbf4~n4TgtoGVtl6lg__',
    'https://s3-alpha-sig.figma.com/img/9ec7/03fd/37e40de737e425f7b7c36080e0220504?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sm6ELb~YJvtu2GS2F0B5WWx6fDfHT9~M5m7fw99PaHZ3E65cyi9xPYIHpzMlY1S84n0dS8uuXNPeaVOZAjnoi9qNSYWCIuFeQalz3UJRtj-T1iPMVwZ9GRGIdTzWarhcznUnnzOjYMBSO0iuyaYK1jz8znQBG0gG-B7WnFu-TmZvXtXiCmPyW-CHKxipm2Zvw19wTkWXqG8AzctgDcqb6-2z8EIv3OLtaCBnQmiXI-ELgHyODMDPakE9vCj6RR7GT8kKdpBsMoQGKPMjOaqRxJFFrVd2CKqzEAIKKkfmHzSMih4w3f3ZntrvwN3OnwVChAEno~3zSHmJIxkP42pDoQ__',
];

interface CoverProps {
    onColorSelect: (color: string) => void;
    onImageSelect: (url: string) => void;
    onHexSelect: (color: string) => void;
    title: string;
    content: string;
    projectData: ProjectEntity | null;
    setEditCover: Dispatch<SetStateAction<boolean>>;
}

const Cover: FC<CoverProps> = ({ onColorSelect, onImageSelect, onHexSelect, title, content, projectData }) => {
    const [color, setColor] = useState(projectData?.color || '');
    const [openHex, setOpenHex] = useState<boolean>(false);

    const handleColorClick = (color: string) => {
        setColor(color);
        onColorSelect(color);
    };
    const handleImageClick = (url: string) => {
        onImageSelect(url);
    };

    const handleColorChange = useCallback(
        (color: ColorResult) => {
            let hexCode = color.hex;
            if (color.rgb.a !== 1) {
                hexCode = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            }
            setColor(hexCode);
            onHexSelect(hexCode);
        },
        [onHexSelect]
    );

    const toggleHex = () => {
        setOpenHex((prev) => !prev);
    };
    const updateProject = async () => {
        const accessToken = localStorage.getItem('access_token');
        const effectiveTitle = title || projectData?.title;
        const effectiveDescription = content || projectData?.description;
        const effectiveColor = color || projectData?.color;
        const effectiveCoverImageUrl = null || projectData?.coverImageUrl;

        const payload = {
            title: effectiveTitle,
            description: effectiveDescription,
            color: effectiveColor,
            coverImageUrl: effectiveCoverImageUrl,
        };
        console.log(payload);
        try {
            const response = await fetch(Http + `/v1/projects/${projectData?.projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update the project');
            }

            const jsonResponse = await response.json();
            console.log('Project updated:', jsonResponse);
            window.location.reload();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    return (
        <CoverContainer>
            <ConverInnerContainer>
                <Register style={{ fontSize: '18px' }} onClick={updateProject}>
                    커버등록
                </Register>
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
                            style={{
                                background: '#ffffff',
                                border: '1px solid black',
                            }}
                            onClick={() => handleColorClick('#ffffff')}
                        />
                        <Color style={{ background: '#D9D9D9' }} onClick={toggleHex}>
                            {plus}
                        </Color>
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
                                onClick={() => handleImageClick(backurls[index])}
                            ></Image>
                        ))}
                    </ImageChoose>
                </ImageContainer>
            </ConverInnerContainer>
            {openHex ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '252px',
                        marginLeft: '8px',
                        marginTop: '37px',
                    }}
                >
                    <ChromePicker
                        disableAlpha={false}
                        color={color}
                        onChange={(selectedColor) => handleColorChange(selectedColor)}
                    />
                </div>
            ) : null}
        </CoverContainer>
    );
};
export default Cover;
