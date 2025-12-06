import React, { useEffect, useState } from 'react';
import { Badge, Row } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const UserHome = () => {
   const [doctors, setDoctors] = useState([]);
   const [userdata, setUserData] = useState({});
   const [activeMenuItem, setActiveMenuItem] = useState('');

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user) {
         setUserData(user);
      }
   };

   const getUserData = async () => {
      try {
         await axios.post(
            'http://localhost:8001/api/user/getuserdata',
            {},
            {
               headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token'),
               },
            }
         );
      } catch (error) {
         console.log(error);
      }
   };

   const getDoctorData = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/user/getalldoctorsu', {
            headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
         });
         if (res.data.success) {
            setDoctors(res.data.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
      getUserData();
      getDoctorData();
   }, []);

   const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/';
   };

   const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
   };

   return (
      <>
         <div className="main">
            <div className="layout">
               <div className="sidebar">
                  <div className="logo">
                     <h2>MediCareBook</h2>
                  </div>

                  <div className="menu">
                     <div
                        className={`menu-items ${
                           activeMenuItem === 'DoctorList' ? 'active' : ''
                        }`}
                        onClick={() => handleMenuItemClick('DoctorList')}
                     >
                        <i className="bi bi-heart-pulse icon"></i>
                        <Link>Doctor</Link>
                     </div>

                     {/* Appointments */}
                     <div
                        className={`menu-items ${
                           activeMenuItem === 'userappointments' ? 'active' : ''
                        }`}
                        onClick={() => handleMenuItemClick('userappointments')}
                     >
                        <i className="bi bi-calendar icon"></i>
                        <Link>Appointments</Link>
                     </div>

                     {/* Apply Doctor - visible only if NOT doctor */}
                     {userdata.isdoctor ? null : (
                        <div
                           className={`menu-items ${
                              activeMenuItem === 'applyDoctor' ? 'active' : ''
                           }`}
                           onClick={() => handleMenuItemClick('applyDoctor')}
                        >
                           <i className="bi bi-heart-pulse icon"></i>
                           <Link>apply as Doctor</Link>
                        </div>
                     )}

                     {/* Logout */}
                     <div className="menu-items" onClick={logout}>
                        <i className="bi bi-box-arrow-right icon"></i>
                        <Link>Logout</Link>
                     </div>
                  </div>
               </div>

               {/* CONTENT AREA */}
               <div className="content">
                  <div className="header">
                     <div className="header-content">
                        <Badge
                           className={`notify ${
                              activeMenuItem === 'notification' ? 'active' : ''
                           }`}
                           count={
                              userdata?.notification
                                 ? userdata.notification.length
                                 : 0
                           }
                           onClick={() => handleMenuItemClick('notification')}
                        >
                           <i className="bi bi-bell icon"></i>
                        </Badge>

                        {userdata.isdoctor && <h3>Dr.</h3>}
                        <h3>{userdata.fullName}</h3>
                     </div>
                  </div>

                  <div className="body">
                     {activeMenuItem === 'applyDoctor' && (
                        <ApplyDoctor userId={userdata._id} />
                     )}
                     {activeMenuItem === 'notification' && <Notification />}
                     {activeMenuItem === 'userappointments' && (
                        <UserAppointments />
                     )}

                     {activeMenuItem !== 'applyDoctor' &&
                        activeMenuItem !== 'notification' &&
                        activeMenuItem !== 'userappointments' && (
                           <Container>
                              <h2 className="text-center p-2">Home</h2>

                              {!userdata.isdoctor && (
                                 <Row>
                                    {doctors &&
                                       doctors.map((doctor, i) => {
                                          let notifyDoc = doctor.userId;
                                          return (
                                             <DoctorList
                                                userDoctorId={notifyDoc}
                                                doctor={doctor}
                                                userdata={userdata}
                                                key={i}
                                             />
                                          );
                                       })}
                                 </Row>
                              )}
                           </Container>
                        )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserHome;
