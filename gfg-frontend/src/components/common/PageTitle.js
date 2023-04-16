const PageTitle = ({title:title,alt:alt}) => {
    return ( 
    <h1 className="pagetitle">{title} <span id="black">{alt}</span></h1>
    );
}
 
export default PageTitle;