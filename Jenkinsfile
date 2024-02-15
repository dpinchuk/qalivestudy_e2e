pipeline{
    agent any
    tools {nodejs "NodeJS"}
    stages {
        stage('Clone Repository'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/dpinchuk/qalivestudy_e2e.git'
            }
        }

        stage('Install Dependencies'){
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests'){
            steps {
                bat 'cypress run --browser=chrome --spec cypress/e2e/ --reporter mocha-allure-reporter'
            }
        }
        stage('Generate Report') {
            steps {
                script {
                    bat 'npm install -g allure-commandline --save-dev'
                    bat 'allure generate allure-results --clean -o allure-report && allure open  allure-report'
                }
            }
        }
    }
}