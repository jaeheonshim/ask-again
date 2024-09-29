import OtterApi from 'otter.ai-api';

const Chatbot = async () => {
    let ab =''
    try {
        const otterApi = new OtterApi({
            email: "askagain2024@gmail.com", // Use environment variables for credentials
            password: "Admin@1234!",
        });

        await otterApi.init(); // Performs login

        ab = await otterApi.getSpeeches();

    } catch (error) {
        console.error('Failed to fetch data from Otter.ai:', error);
    }
    return (
        <div>
            {JSON.stringify(ab)} {/* Display the speech data */}
        </div>
    );
};

export default Chatbot;
