import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Campus.css';
const sectionOptions = {
    Campus: ['Bangalore', 'Pune', 'Raipur', 'Jashpur', 'Amravati', 'Delhi'],
    Bootcamp: ['No Camp', 'Meraki', 'Zuvy', 'Natwest', 'Frappe'],
    Module: ['Module 0', 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5A', 'Module 5B', 'Module 6A', 'Module 6B'],
    Topic: ['Basic Math', 'Number System', 'Basic Flowchart', 'If-Else', 'Loops', 'Array', 'Object', 'Function', 'String'],
    'Job Ready': ['Yes', 'No'],
    'Current Status': ['Active', 'Placed', 'Long leave', 'Dropout'],
    School: ['SOP', 'SOB', 'SOD', 'SOE', 'SOF'],
    'Council Post': ['HC', 'FC', 'AC', 'T&P', 'DC', 'EC', 'CC']
};
function Campus() {
    const [formState, setFormState] = useState({
        Email: '',
        Campus: '',
        Module: '',
        Bootcamp: '',
        Topic: '',
        'Job Ready': '',
        'Current Status': '',
        School: '',
        'Council Post': ''
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleChange = (section) => (event) => {
        setFormState({
            ...formState,
            [section]: event.target.value
        });
        setError('');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if email ends with '@navgurukul.org'
        if (!formState.Email.endsWith('@navgurukul.org')) {
            setError('Email must end with @navgurukul.org');
            return;
        }
        try {
            await fetch('https://script.google.com/macros/s/AKfycbydjwRMwPVnMFJn0-9XnboXxOn51GDsQGWqmiY0ykEDyPtQcd-oIkiA_4sKiRxXpSlG/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState),
                mode: 'no-cors'
            });
            alert('Form submitted successfully');
            navigate('/');
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to submit form. Please try again later.');
        }
    };
    return (
        <div className="campus-form-container">
            <form className="campus-form" onSubmit={handleSubmit}>
                <h2>Select Campus Details</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formState.Email}
                        onChange={handleChange('Email')}
                        placeholder="Enter your email"
                        required
                    />
                    {error && <p className="error">{error}</p>}
                </div>
                {Object.keys(sectionOptions).map((section, index) => (
                    <div key={index} className="form-group">
                        <label>{section}:</label>
                        <select
                            value={formState[section]}
                            onChange={handleChange(section)}

                        >
                            <option value="" disabled>Select a {section}</option>
                            {sectionOptions[section].map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default Campus;