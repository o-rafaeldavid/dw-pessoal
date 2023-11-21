
import SocialList from './socialList'

import { instaLogo, linkedInLogo, behanceLogo } from '../../_universal/social'

import '../../styles/social.scss'



export default function Social(){
    
    return(
        <ul id="social">
            <SocialList to="https://www.instagram.com/the___r___studio" icon={instaLogo}/>
            <SocialList to="https://www.linkedin.com/in/rafael-david-125570280/" icon={linkedInLogo}/>
            <SocialList to="https://www.behance.net/o_rafaeldavid" icon={behanceLogo}/>
        </ul>
    )
}