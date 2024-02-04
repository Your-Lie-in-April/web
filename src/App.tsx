import { useEffect, useState, ChangeEventHandler } from 'react';

function App() {
    const [memberId, setMemberId] = useState<string>();
    const [status, setStatus] = useState<string>();
    const [nickname, setNickname] = useState<string>();
    const [projectId, setProjectId] = useState<string>();

    useEffect(() => {
        //회원 전체 조회
        const Members = async () => {
            const response = await fetch('/v1/members/all', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('회원목록', data);
            }
        };
        Members();
        //프로젝트 전체 조회
        const Projects = async () => {
            const response = await fetch('/v1/projects/all', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('프로젝트목록', data);
            }
        };
        //스케쥴 전체 조회
        const Schedules = async () => {
            const response = await fetch('/v1/schedules/all', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('스케쥴목록', data);
            }
        };
        Schedules();
    }, []);

    //회원 정보 조회
    const MemberId = async () => {
        const response = await fetch(`/v1/members/${memberId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('회원정보', data);
        } else {
            console.error('에러');
        }
    };
    const handleMemeberId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setMemberId(e.target.value);
    };
    const Seemember = () => {
        MemberId();
    };

    //상태메시지 설정
    const Status = async () => {
        const response = await fetch(`/v1/members/${status}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({ status: status }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('상태메시지 설정', data);
        } else {
            console.error('에러');
        }
    };
    const handleStatus: ChangeEventHandler<HTMLInputElement> = (e) => {
        setStatus(e.target.value);
    };
    const SeeStatus = () => {
        Status();
    };

    //닉네임 재설정
    const Nickname = async () => {
        const response = await fetch('/v1/projects/members/nickname', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({ projectId: 1, nickname: nickname }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log('닉네임 재설정', data);
        } else {
            console.error('에러');
        }
    };
    const handleNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNickname(e.target.value);
    };
    const SeeNickname = () => {
        Nickname();
    };
    // 프로젝트 보관 or 삭제
    type HttpMethod = 'POST' | 'DELETE';
    const handleStorage = async (method: HttpMethod) => {
        const response = await fetch(`/v1/members/storage/${projectId}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            body: JSON.stringify({ projectId: projectId }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`프로젝트 ${method}`, data);
        } else {
            console.error('에러');
        }
    };

    const ProjectStorage = async () => {
        await handleStorage('POST');
    };

    const ProjectDelete = async () => {
        await handleStorage('DELETE');
    };

    const handleProjectStorage: ChangeEventHandler<HTMLInputElement> = (e) => {
        setProjectId(e.target.value);
    };
    const SeeProjectStorage = () => {
        ProjectStorage();
    };
    const SeeProjectDelete = () => {
        ProjectDelete();
    };

    return (
        <div>
            <div>MSW로 받아온 데이터</div>
            <br />
            <input value={memberId} onChange={handleMemeberId}></input>
            <button onClick={Seemember}>회원정보 확인</button>
            <br />
            <input value={status} onChange={handleStatus}></input>
            <button onClick={SeeStatus}>상태메시지 변경</button>
            <br />
            <input value={nickname} onChange={handleNickname}></input>
            <button onClick={SeeNickname}>닉네임 변경</button>
            <br />
            <input value={projectId} onChange={handleProjectStorage}></input>
            <button onClick={SeeProjectStorage}>프로젝트 보관</button>
            <button onClick={SeeProjectDelete}>프로젝트 삭제</button>
        </div>
    );
}

export default App;
