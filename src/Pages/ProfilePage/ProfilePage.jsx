import { useState} from 'react'
import ProfileNavbar from '../../Components/ProfileNavbar/ProfileNavbar'

const ProfilePage = () => {
    const [profileContent, setProfileContent] = useState("Management");

    const onChange = (option) =>{
        setProfileContent(option);
    }


    let content

    switch (profileContent){
        case "Management":
            content = <>Management</>
            break
        case "Organize":
            content = <>Organize</>
            break
        case "Participate":
            content = <>Participate</>
            break
        default:
            content = <></>
    }
  return (
    <div>
        <ProfileNavbar onChange={onChange}/>
        {content}
    </div>
  )
}

export default ProfilePage
