import React, { useState, useEffect, useContext } from 'react';
import './personal.css';
import Pronav from './Pronav';
import { ProfileContext } from './ProfileContext';

const questions = {
    BasicInfo: ['Full Name', 'Date of Birth', 'Gender', 'Email Address', 'Phone Number', 'Location (City, State, Country)'],
    PersonalInfo: ['Height', 'Weight', 'Body Type', 'Ethnicity', 'Religion/Spiritual Beliefs', 'Languages Spoken'],
    EducationalBackground: ['What is your highest degree?', 'Which school, college, uni did you attend?', 'Field of Study'],
    Professional: ['Occupation', 'What is your current job title?', 'Industry', 'Company Name', 'Monthly Income'],
    LifestyleAndInterests: ['Do you exercise regularly?', 'What are your hobbies?', 'Dietary Preferences (e.g., vegetarian, non-vegetarian)', 'Smoking Habits', 'Drinking Habits', 'Favorite Activities', 'Travel Preferences'],
    FamilyBackground: ['Family Type (e.g., nuclear, joint)', 'Siblings', 'Parents’ Occupation', 'Family Values (e.g., traditional, moderate, liberal)'],
    RelationshipPreferences: [
        'What qualities do you look for in a partner?',
        'What is your ideal relationship?',
        'Preferred Age Range for Partner',
        'Preferred Height Range for Partner',
        'Preferred Body Type for Partner',
        'Preferred Religion/Spiritual Beliefs for Partner',
        'Preferred Ethnicity for Partner',
        'Preferred Location for Partner (willingness to relocate)',
        'Education Level of Partner',
        'Occupation of Partner',
        'Annual Income of Partner (optional)',
        'Family Type Preference (nuclear, joint)',
        'Family Values of Partner (traditional, moderate, liberal)'
    ],
    PersonalityAndValues: [
        'Describe Yourself in a Few Words',
        'Three Things You Are Passionate About',
        'Values and Beliefs You Hold Dear',
        'What Are You Looking for in a Partner?',
        'Deal-breakers in a Relationship'
    ],
    MaritalPreferences: [
        'Do you want to get married?',
        'What are your views on marriage?',
        'Marital Status (never married, divorced, widowed)',
        'Children (do you have children, are you open to partners with children)',
        'Future Family Plans (do you want children in the future)'
    ],
    Miscellaneous: [
        'Do You Own a House?',
        'Do You Own a Car?',
        'Willingness to Relocate',
        'Any Additional Information You’d Like to Share'
    ],
    VerifyEmailPhone: [
        'Verify Email',
        'Verify Phone Number',
    ],

    VerifyDocsProfile: [
        'Upload Profile Picture',
        'Upload Documents (Biodata) for Verification'
    ],
};

function PersonalInfo() {
    const [username, setUsername] = useState('');
    const [isImageBlurred, setIsImageBlurred] = useState(false);
    const [info, setInfo] = useState({
        BasicInfo: true,
        PersonalInfo: true,
        EducationalBackground: true,
        Professional: true,
        LifestyleAndInterests: true,
        FamilyBackground: true,
        RelationshipPreferences: true,
        PersonalityAndValues: true,
        MaritalPreferences: true,
        Miscellaneous: true,
        VerifyEmailPhone: true,
        VerifyDocsProfile: true,
    });
    const [currentSection, setCurrentSection] = useState(null);
    const [answers, setAnswers] = useState({});

    const [profilePicture, setProfilePicture] = useState(null);
    const { setProfileData } = useContext(ProfileContext); // State to hold the profile picture file or URL

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch username');
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };
        fetchUsername();
    }, []);

    const toggleInfo = (key) => {
        setInfo({ ...info, [key]: !info[key] });
    };

    const toggleImageBlur = () => {
        setIsImageBlurred(!isImageBlurred);
    };

    const handleSectionClick = (section) => {
        setCurrentSection(section);
    };

    const handleInputChange = (event, question) => {
        const { value } = event.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [question]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file); // Update profile picture state with the uploaded file
    };

    const handleDocumentChange = (e) => {
        // Handle multiple documents upload
    };

    const handleSubmit = () => {
        const profileData = {
            username,
            profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : null,
            answers,
        };

        setProfileData(profileData);
        // Redirect to UserProfile page or show success message
    };



    return (


        <div className='profile'>
            <div className="welcome">
                {username ? (
                    <h2>Welcome, {username}</h2>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Pronav />
            <div className="personal-info">
                <div className="personal-img">
                    <img
                        src={profilePicture ? URL.createObjectURL(profilePicture) : "images/user_icon.png"}
                        alt="user"
                        className={isImageBlurred ? 'blur' : ''}
                    />
                    <div className="blur-control">
                        <p>click to make the photo blur</p>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isImageBlurred}
                                onChange={toggleImageBlur}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className="personal-info-box">
                    <h3>Personal information</h3>
                    <div className="info-list">
                        {Object.keys(info).map((key) => (
                            <div key={key} className="info-item" onClick={() => handleSectionClick(key)}>
                                <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                            </div>
                        ))}
                    </div>
                    <p className="note">
                        ***Turn the button off for hiding those informations
                        <br />
                        Give all the information properly to be able to send matching request
                    </p>
                </div>
            </div>
            <div className="circle2"></div>

            {currentSection && (
                <div className="questions-box">
                    <h3>{currentSection.replace(/([A-Z])/g, ' $1')}</h3>
                    {questions[currentSection].map((question, index) => (
                        <div key={index} className="question-item">
                            <label>{question}</label>
                            {currentSection === 'VerifyDocsProfile' ? (
                                <input type="file" onChange={index === 0 ? handleProfilePictureChange : handleDocumentChange} />
                            ) : (
                                <div className="input-with-switch">
                                    <input
                                        type="text"
                                        placeholder="Your answer"
                                        value={answers[question] || ''}
                                        onChange={(e) => handleInputChange(e, question)}
                                    />
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="personal-btns">
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => setCurrentSection(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>


    );
}

export default PersonalInfo;









