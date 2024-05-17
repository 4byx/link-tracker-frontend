import React, { useEffect, useState } from 'react';
import { getAllStats } from '../api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define a CSS class for the table
const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
};

// Define CSS styles for table header cells
const thStyle = {
    backgroundColor: '#f2f2f2',
    color: '#333',
    fontWeight: 'bold',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
};

// Define CSS styles for table data cells
const tdStyle = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
};

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAllStats();
                console.log("==data", data);
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const processChartData = () => {
        const chartData = [];
        stats.forEach(link => {
            link.visits.forEach(visit => {
                const existingEntry = chartData.find(entry => entry.date === visit.date);
                if (existingEntry) {
                    existingEntry[link.originalUrl] = visit.hits;
                } else {
                    chartData.push({
                        date: visit.date,
                        [link.originalUrl]: visit.hits,
                    });
                }
            });
        });
        return chartData;
    };

    const copyToClipboard = (redirectUrl) => {
        navigator.clipboard.writeText(redirectUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return (
        <div>
            <h1>Link Statistics Dashboard</h1>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={processChartData()}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {stats.map(link => (
                        <Line
                            key={link.originalUrl}
                            type="monotone"
                            dataKey={link.originalUrl}
                            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Original URL</th>
                        <th style={thStyle}>Total Hits</th>
                        <th style={thStyle}>Redirect URL</th> {/* New column for copy button */}
                    </tr>
                </thead>
                <tbody>
                    {stats.map(link => (
                            <tr>
                                <td style={tdStyle}>{link.originalUrl}</td>
                                <td style={tdStyle}>{link.hits}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => copyToClipboard(link.redirectUrl)}>
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
