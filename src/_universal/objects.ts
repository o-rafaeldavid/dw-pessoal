import rawls_0 from "../assets/img/topicos/0 - powerpoint/rawls_0.png"
import vetorial_thumb from "../assets/img/topicos/1 - design vetorial/thumbnail.png"
import viagem_a_marte_thumb from "../assets/img/topicos/2 - motion graphics/motion_thumb.png"

import PowerpointSection from "../components/journey/0 - powerpoint"
import VetorialSection from "../components/journey/1 - vetorial"
import MotionGraphicsSection from "../components/journey/2 - motiongraphics"
import ProgramacaoSection from "../components/journey/3 - programacao"
import WebSection from "../components/journey/4 - web"
import AppsSection from "../components/journey/5 - apps"


// thumbs que aparecem para escolher no index
export const chooseProjectThumbnail = [
    rawls_0,
    vetorial_thumb,
    viagem_a_marte_thumb
]

// nomes de cada secção da journey
export const projectsToChoose = [
    "powerpoints",
    "design vetorial",
    "motion graphics",
    "programação",
    "web",
    "apps"
]

// secções da journey
export const journeySections = [
    PowerpointSection,
    VetorialSection,
    MotionGraphicsSection,
    ProgramacaoSection,
    WebSection,
    AppsSection
]