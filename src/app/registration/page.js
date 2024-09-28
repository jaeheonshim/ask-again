import { auth } from "@/auth";
import User from "@/models/user";

export default async function Registration() {
    const session = await auth();

    if (!session.user) return null;

    const user = session.user;
    const userModel = User.findOne({ id: user.id });

    const setUserType = (userType) => {
        
    }

    if(!userModel) return null;

    if(!userModel.userType) {
        return (
            <div>
                <button>I'm a Patient</button>
                <br></br>
                <button>I'm a Doctor</button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Choose role</h2>
            <form>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="doctor"
                        />
                        Doctor
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="patient"
                        />
                        Patient
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};