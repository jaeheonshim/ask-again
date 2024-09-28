import { auth } from '@/auth';
import DoctorCard from '@/components/DoctorCard';
import Doctor from '@/models/doctor';
import connectMongo from '@/mongoose';
import Link from 'next/link';
import "./page.css";

export default async function DoctorDashboard() {
    await connectMongo();

    const session = await auth();
    if (!session?.user) return null;
    const user = session.user;

    const doctor = await Doctor.findOne({ userId: user.id });

    return (
        <main>
            <br />
            <br />
            <br />
            {/* Carousel */}
            <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <div className="bd-placeholder-img" style={{ width: "100%", height: "400px", backgroundColor: "#6c757d" }}></div>
                        <div className="container">
                            <div className="carousel-caption text-center">
                                <h1>Manage Appointments</h1>
                                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat enim libero, vel faucibus neque posuere et.</p>
                                <p><a className="btn btn-lg btn-gradient" href="#">Complete Registration</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="bd-placeholder-img" style={{ width: "100%", height: "400px", backgroundColor: "#6c757d" }}></div>
                        <div className="container">
                            <div className="carousel-caption text-center">
                                <h1>Track Patient Records</h1>
                                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit ultricies dolor, non viverra libero pellentesque et.</p>
                                <p><a className="btn btn-lg btn-gradient" href="#">Complete Registration</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <div className="bd-placeholder-img" style={{ width: "100%", height: "400px", backgroundColor: "#6c757d" }}></div>
                        <div className="container">
                            <div className="carousel-caption text-center">
                                <h1>Access Medical History</h1>
                                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac libero ac lorem lacinia venenatis sed at sapien.</p>
                                <p><a className="btn btn-lg btn-gradient" href="/doctor/edit">Complete Registration</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Marketing Messaging and Featurettes */}
            <div className="container marketing">
                {/* Three columns of text below the carousel */}
                <div className="row text-center">
                    <div className="col-lg-4 mb-4">
                        <div className="card h-100" style={{ height: '350px' }}>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <svg className="bd-placeholder-img rounded-circle mb-3" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#6c757d"></rect>
                                </svg>
                                <h2 className="fw-normal mt-3 gradient-text">Profile Setup</h2>
                                <p className="mt-3 gradient-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in nibh lectus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card h-100" style={{ height: '350px' }}>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <svg className="bd-placeholder-img rounded-circle mb-3" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#6c757d"></rect>
                                </svg>
                                <h2 className="fw-normal mt-3 gradient-text">Appointment Management</h2>
                                <p className="mt-3 gradient-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat purus sit amet dolor.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <div className="card h-100" style={{ height: '350px' }}>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <svg className="bd-placeholder-img rounded-circle mb-3" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#6c757d"></rect>
                                </svg>
                                <h2 className="fw-normal mt-3 gradient-text">Patient Records</h2>
                                <p className="mt-3 gradient-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget enim ac ipsum pulvinar cursus.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="featurette-divider" />
            </div>
        </main>
    );
}
