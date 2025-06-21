


export const Login = () => {
    return (
        <div className="flex flex-column flex-center-all">
            <h1 className="text-2xl">Sign In</h1>
            <form className="flex flex-column margin-top-16">
                <label htmlFor="email" className="text-lg">Email:</label>
                <input type="email" id="email" name="email" required className="margin-top-8 margin-bottom-16" />
                
                <label htmlFor="password" className="text-lg">Password:</label>
                <input type="password" id="password" name="password" required className="margin-top-8 margin-bottom-16" />
                
                <button type="submit" className="button-primary">Sign In</button>
            </form>
        </div>
    );
}