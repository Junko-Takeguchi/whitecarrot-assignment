import { useEffect, useState } from 'react';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [events, setEvents] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        // Check for query params to confirm if authenticated
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('authenticated')) {
            setIsSignedIn(true);
            fetchEvents(); // Automatically fetch events after login
        }
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const url = 'http://localhost:3000/google';
            window.location.href = url; // Redirect to sign-in URL
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3000/google/calendar/list');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching calendar events:", error);
        }
    };

    const filteredEvents = events.filter((event) => {
        if (!filterDate) return true;
        const eventDate = new Date(event.start.dateTime || event.start.date).toISOString().split('T')[0];
        return eventDate === filterDate;
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            {!isSignedIn ? (
                <button type="button"
                        onClick={handleGoogleSignIn}
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="currentColor" viewBox="0 0 18 19">
                        <path fill-rule="evenodd"
                              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                              clip-rule="evenodd"/>
                    </svg>
                    Login with Google
                </button>
            ) : (
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Google Calendar Events</h2>
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2 text-sm"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>
                    <table className="table-auto w-full text-left border-collapse border border-gray-200">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Event Name</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Time</th>
                            <th className="border border-gray-300 px-4 py-2">Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredEvents.map((event, index) => {
                            const startDateTime = new Date(event.start.dateTime || event.start.date);
                            const formattedDate = startDateTime.toLocaleDateString();
                            const formattedTime = startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{event.summary}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formattedDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formattedTime}</td>
                                    <td className="border border-gray-300 px-4 py-2">{event.location || 'N/A'}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    {events.length === 0 && <p className="text-center mt-4">No events found.</p>}
                </div>
            )}
        </div>
    );
}

export default App;
