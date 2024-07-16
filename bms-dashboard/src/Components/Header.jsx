import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <span className="header-span">
                <div className='Img-div'>
                    <img src="./logo.png" alt="Logo"></img>
                </div>
                <h1>Battery Management System Dashboard</h1>
            </span>
        </div>
    )
}
