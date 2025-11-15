import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './UserAnalytics.css';

export default function Analytics() {
  const navigate = useNavigate();
  const [selectedDevices, setSelectedDevices] = useState(['VIZ25A01', 'VIZ25A02']);
  const [selectedDuration, setSelectedDuration] = useState('Hourly');

  // Get current date info
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentDate = today.toLocaleDateString('en-GB');

  // ============ HOURLY DATA ============
  const hourlyChartData = [
    { time: '0hr', 'VIZ25A01': 2, 'VIZ25A02': 1 },
    { time: '1hr', 'VIZ25A01': 2.5, 'VIZ25A02': 1.2 },
    { time: '2hr', 'VIZ25A01': 2.2, 'VIZ25A02': 1.1 },
    { time: '3hr', 'VIZ25A01': 3, 'VIZ25A02': 1.5 },
    { time: '4hr', 'VIZ25A01': 2.8, 'VIZ25A02': 1.4 },
    { time: '5hr', 'VIZ25A01': 2.5, 'VIZ25A02': 1.2 },
    { time: '6hr', 'VIZ25A01': 2.5, 'VIZ25A02': 2 },
    { time: '7hr', 'VIZ25A01': 3.2, 'VIZ25A02': 2.2 },
    { time: '8hr', 'VIZ25A01': 3.5, 'VIZ25A02': 2.4 },
    { time: '9hr', 'VIZ25A01': 4, 'VIZ25A02': 2.5 },
    { time: '10hr', 'VIZ25A01': 3.8, 'VIZ25A02': 2.6 },
    { time: '11hr', 'VIZ25A01': 3.5, 'VIZ25A02': 2.5 },
    { time: '12hr', 'VIZ25A01': 3.5, 'VIZ25A02': 3 },
    { time: '13hr', 'VIZ25A01': 3.2, 'VIZ25A02': 2.8 },
    { time: '14hr', 'VIZ25A01': 3.1, 'VIZ25A02': 2.9 },
    { time: '15hr', 'VIZ25A01': 3, 'VIZ25A02': 2.8 },
    { time: '16hr', 'VIZ25A01': 3.5, 'VIZ25A02': 3.1 },
    { time: '17hr', 'VIZ25A01': 4.2, 'VIZ25A02': 3.3 },
    { time: '18hr', 'VIZ25A01': 5, 'VIZ25A02': 3.5 },
    { time: '19hr', 'VIZ25A01': 4.8, 'VIZ25A02': 3.6 },
    { time: '20hr', 'VIZ25A01': 4.6, 'VIZ25A02': 3.9 },
    { time: '21hr', 'VIZ25A01': 4.5, 'VIZ25A02': 4 },
    { time: '22hr', 'VIZ25A01': 4.2, 'VIZ25A02': 3.8 },
    { time: '23hr', 'VIZ25A01': 4, 'VIZ25A02': 3.5 },
    { time: '24hr', 'VIZ25A01': 6, 'VIZ25A02': 4.8 },
  ];

  const hourlyTableData = [
    { duration: '00:00 - 01:00', 'VIZ25A01': '2kWh', 'VIZ25A02': '1kWh', total: '3kWh' },
    { duration: '01:00 - 02:00', 'VIZ25A01': '2.5kWh', 'VIZ25A02': '1.2kWh', total: '3.7kWh' },
    { duration: '02:00 - 03:00', 'VIZ25A01': '2.2kWh', 'VIZ25A02': '1.1kWh', total: '3.3kWh' },
    { duration: '03:00 - 04:00', 'VIZ25A01': '3kWh', 'VIZ25A02': '1.5kWh', total: '4.5kWh' },
  ];

  // ============ WEEKLY DATA ============
  const weeklyChartData = [
    { week: 'Week 1 ', 'VIZ25A01': 12, 'VIZ25A02': 8 },
    { week: 'Week 2 ', 'VIZ25A01': 18, 'VIZ25A02': 12 },
    { week: 'Week 3 ', 'VIZ25A01': 15, 'VIZ25A02': 10 },
    { week: 'Week 4 ', 'VIZ25A01': 16, 'VIZ25A02': 11 },
  ];

  const weeklyTableData = [
    { week: 'Week 1 (1-7 Nov)', 'VIZ25A01': '12kWh', 'VIZ25A02': '8kWh', total: '20kWh' },
    { week: 'Week 2 (8-14 Nov)', 'VIZ25A01': '18kWh', 'VIZ25A02': '12kWh', total: '30kWh' },
    { week: 'Week 3 (15-21 Nov)', 'VIZ25A01': '15kWh', 'VIZ25A02': '10kWh', total: '25kWh' },
    { week: 'Week 4 (22-28 Nov)', 'VIZ25A01': '16kWh', 'VIZ25A02': '11kWh', total: '27kWh' },
  ];

  // ============ MONTHLY DATA ============
  const monthlyChartData = [
    { month: 'Jan', 'VIZ25A01': 45, 'VIZ25A02': 32 },
    { month: 'Feb', 'VIZ25A01': 52, 'VIZ25A02': 38 },
    { month: 'Mar', 'VIZ25A01': 48, 'VIZ25A02': 35 },
    { month: 'Apr', 'VIZ25A01': 61, 'VIZ25A02': 44 },
    { month: 'May', 'VIZ25A01': 55, 'VIZ25A02': 40 },
    { month: 'Jun', 'VIZ25A01': 67, 'VIZ25A02': 48 },
    { month: 'Jul', 'VIZ25A01': 72, 'VIZ25A02': 52 },
    { month: 'Aug', 'VIZ25A01': 70, 'VIZ25A02': 50 },
    { month: 'Sep', 'VIZ25A01': 65, 'VIZ25A02': 46 },
    { month: 'Oct', 'VIZ25A01': 58, 'VIZ25A02': 42 },
    { month: 'Nov', 'VIZ25A01': 61, 'VIZ25A02': 44 },
  ];

  const monthlyTableData = [
    { month: 'January', 'VIZ25A01': '45kWh', 'VIZ25A02': '32kWh', total: '77kWh' },
    { month: 'February', 'VIZ25A01': '52kWh', 'VIZ25A02': '38kWh', total: '90kWh' },
    { month: 'March', 'VIZ25A01': '48kWh', 'VIZ25A02': '35kWh', total: '83kWh' },
    { month: 'April', 'VIZ25A01': '61kWh', 'VIZ25A02': '44kWh', total: '105kWh' },
    { month: 'May', 'VIZ25A01': '55kWh', 'VIZ25A02': '40kWh', total: '95kWh' },
    { month: 'June', 'VIZ25A01': '67kWh', 'VIZ25A02': '48kWh', total: '115kWh' },
    { month: 'July', 'VIZ25A01': '72kWh', 'VIZ25A02': '52kWh', total: '124kWh' },
    { month: 'August', 'VIZ25A01': '70kWh', 'VIZ25A02': '50kWh', total: '120kWh' },
    { month: 'September', 'VIZ25A01': '65kWh', 'VIZ25A02': '46kWh', total: '111kWh' },
    { month: 'October', 'VIZ25A01': '58kWh', 'VIZ25A02': '42kWh', total: '100kWh' },
    { month: 'November', 'VIZ25A01': '61kWh', 'VIZ25A02': '44kWh', total: '105kWh' },
  ];

  const devices = ['VIZ25A01', 'VIZ25A02'];
  const durations = ['Hourly', 'Weekly', 'Monthly'];

  // Select data based on duration
  const getChartData = () => {
    if (selectedDuration === 'Hourly') return hourlyChartData;
    if (selectedDuration === 'Weekly') return weeklyChartData;
    return monthlyChartData;
  };

  const getTableData = () => {
    if (selectedDuration === 'Hourly') return hourlyTableData;
    if (selectedDuration === 'Weekly') return weeklyTableData;
    return monthlyTableData;
  };

  const getChartTitle = () => {
    if (selectedDuration === 'Hourly') {
      return `Hourly - ${currentDate}`;
    } else if (selectedDuration === 'Weekly') {
      return `Weekly - ${currentMonth} ${currentYear}`;
    } else {
      return `Monthly - ${currentYear}`;
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const handleDeviceToggle = (device) => {
    setSelectedDevices((prev) =>
      prev.includes(device)
        ? prev.filter((d) => d !== device)
        : [...prev, device]
    );
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  return (
    <div className="analytics-root">
      {/* ============ HEADER - FIXED LAYOUT ============ */}
      <div className="analytics-header">
        <button
          className="analytics-back-btn"
          onClick={handleBack}
          aria-label="Back"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="analytics-title">Analytics</h1>
      </div>

      {/* ============ CONTAINER ============ */}
      <div className="analytics-container">
        {/* ---- FILTERS SECTION ---- */}
        <div className="analytics-filters">
          {/* Devices Filter */}
          <div className="analytics-filter-group">
            <label className="analytics-filter-label">
              <i className="fas fa-filter"></i> Devices
            </label>
            <div className="analytics-filter-options">
              {devices.map((device) => (
                <button
                  key={device}
                  className={`analytics-filter-btn ${
                    selectedDevices.includes(device) ? 'active' : ''
                  }`}
                  onClick={() => handleDeviceToggle(device)}
                >
                  {device}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="analytics-filter-group">
            <label className="analytics-filter-label">
              <i className="fas fa-clock"></i> Duration
            </label>
            <div className="analytics-filter-options">
              {durations.map((duration) => (
                <button
                  key={duration}
                  className={`analytics-filter-btn ${
                    selectedDuration === duration ? 'active' : ''
                  }`}
                  onClick={() => handleDurationChange(duration)}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---- CHART SECTION ---- */}
        <div className="analytics-chart-section">
          <div className="analytics-chart-header">
            <h2 className="analytics-chart-title">{getChartTitle()}</h2>
          </div>
          <div className="analytics-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey={selectedDuration === 'Hourly' ? 'time' : selectedDuration === 'Weekly' ? 'week' : 'month'}
                  stroke="#A4E376"
                  tick={{ fontSize: 12, fill: '#A4E376' }}
                  angle={selectedDuration === 'Hourly' ? 0 : -45}
                  height={selectedDuration === 'Hourly' ? 30 : 80}
                />
                <YAxis
                  label={{ value: 'Units (kWh)', angle: -90, position: 'insideLeft', stroke: '#A4E376' }}
                  stroke="#A4E376"
                  tick={{ fontSize: 12, fill: '#A4E376' }}
                />
                <Tooltip
                  contentStyle={{ background: '#0A2A4A', border: '1px solid #A4E376' }}
                  labelStyle={{ color: '#A4E376' }}
                />
                <Legend wrapperStyle={{ color: '#A4E376' }} iconType="line" />
                {selectedDevices.includes('VIZ25A01') && (
                  <Line
                    type="monotone"
                    dataKey="VIZ25A01"
                    stroke="#00CC66"
                    dot={{ fill: '#00CC66', r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={2.5}
                  />
                )}
                {selectedDevices.includes('VIZ25A02') && (
                  <Line
                    type="monotone"
                    dataKey="VIZ25A02"
                    stroke="#FF3333"
                    dot={{ fill: '#FF3333', r: 5 }}
                    activeDot={{ r: 7 }}
                    strokeWidth={2.5}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ---- TABLE SECTION ---- */}
        <div className="analytics-table-section">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>{selectedDuration === 'Hourly' ? 'Duration' : selectedDuration === 'Weekly' ? 'Week' : 'Month'}</th>
                <th>Units Consumed (VIZ25A01)</th>
                <th>Units Consumed (VIZ25A02)</th>
                <th>Units Consumed - Total</th>
              </tr>
            </thead>
            <tbody>
              {getTableData().map((row, idx) => (
                <tr key={idx}>
                  <td>{row.duration || row.week || row.month}</td>
                  <td>{row['VIZ25A01']}</td>
                  <td>{row['VIZ25A02']}</td>
                  <td className="analytics-table-total">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
