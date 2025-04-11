interface HeaderProps{
    title:string;
}
function Header({title}:HeaderProps){
    return(
        <header style={{backgroundColor:'lightblue',padding:'10px 20px'}}>
            <h1>{title}</h1>

        </header>
    );
}
export default Header;