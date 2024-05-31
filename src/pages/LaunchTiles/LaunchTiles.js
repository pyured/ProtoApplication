import "./LaunchTiles.scss";
import schoolLogo from "./logos/school-logo.png";
import eventLogo from "./logos/events.png";
import calendarLogo from "./logos/calendar.png";
import transportLogo from "./logos/transportationimage.jpg";
import lunchLogo from "./logos/freemealsimage.png";
import enrollmentLogo from "./logos/enrollment.jpg";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-bootstrap/Carousel';

function LaunchTiles()
{
    return(
        <UncontrolledExample/>
    );
}
function Card({ title, desc, color, url})
{
    let imagePath = "";
    switch (title){
        case "Calendar":
            imagePath = calendarLogo;
        break;
        case "Transportation":
            imagePath = transportLogo;
        break;
        case "School List":
            imagePath = schoolLogo;
        break;
        case "Announcements":
            imagePath = eventLogo;
        break;
        case "School Meals":
            imagePath = lunchLogo;
        break;
        case "Enrollment":
            imagePath = enrollmentLogo;
        break;
        default:
            imagePath="none";
        break;
    }
    return(
        <span className="cardContainer" onClick={() => window.open(url, '_blank')}>
            <div className="topIndicator" style={{background:`${color}`}}></div>
            <div className="columnHolder">
                <div className="photoContainer">
                    <img className="image" src={imagePath} alt="card logo"/>                  
                </div>
                <div className="cardTitle">
                    {title}
                </div>
                <div className="cardContent">
                    {desc}
                </div>
            </div>
        </span>
    );
}
export default LaunchTiles;
function UncontrolledExample() {
    const calendarURL = "https://cdn-blob-prd.azureedge.net/prd-pws/docs/default-source/default-document-library/school-year-2023-24-calendar-corrected.pdf?sfvrsn=a8e6eb7e_2"
    const transportURL = "https://www.schools.nyc.gov/school-life/transportation/transportation-overview"
    const schoolListURL = "https://www.nyc.gov/assets/mfta/downloads/pdf/mfta_school_accounts.pdf"
    const eventsURL = "https://www.schools.nyc.gov/about-us/news/announcements"
    const mealsURL = "https://www.schools.nyc.gov/school-life/food/school-meals"
    const enrollURL = "https://www.schools.nyc.gov/enrollment/enrollment-help/new-students"
    return (
        <Carousel className="tileContainer">
        <Carousel.Item>
            <div className="gridSlide">
                <Card title="Calendar" desc="View important DOE dates for events, holidays, school closings, and more." color={"red"} url={calendarURL} />
                <Card title="Transportation" desc="Get information and updates on travel routes and services." color={"blue"} url={transportURL} />
                <Card title="School List" desc="View the masterlist of DOE schools across the city or in your district." color={"green"} url={schoolListURL} />
            </div>
        </Carousel.Item>
        <Carousel.Item>
            <div className="gridSlide">
                <Card title="Announcements" desc="Keep up with upcoming events and activities for parents, students, and teachers." color={"purple"} url={eventsURL} />
                <Card title="School Meals" desc="Get information about school meals and nutrition programs." color={"orange"} url={mealsURL} />
                <Card title="Enrollment" desc="Find information on enrolling your child in school." color={"cyan"} url={enrollURL} />
            </div>
        </Carousel.Item>
    </Carousel>
    );
  }