import React from 'react';
import './profileNavbar.css';
import { Link } from 'react-router-dom';

const ProfileNavbar = ({ onChange }) => {
    const sections = [{key: "Management", value:"Profil konta"}, {key: "Participate", value:"Zarezerwowane udziały w  wydarzeniach"}, {key: "Organize", value: "Moje zorganizowane wydarzenia"}];

    const content = sections.map((section) => {
        return (
            <div key={section.key} className="profile-section" onClick={() => onChange(section.key)}>
                <span className="profile-link">{section.value}</span>
            </div>
        )
    })
    return (
        <div className="profile-nav">
            {content}
        </div>
    )
}

export default ProfileNavbar
