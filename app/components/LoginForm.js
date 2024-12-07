export default LoginForm( {loginUser}){
    return (
            <form className={styles.form} onSubmit={(e) => loginUser(e)}></form>
    )
}

