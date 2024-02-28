pipeline{
    agent any
    tools {nodejs "NodeJS"}
    stages {
        stage('Clone Repository') {
            steps{
                git branch: 'main',
                    url: 'https://github.com/dpinchuk/qalivestudy_e2e.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh '''
                    npm install -D
                '''
            }
        }
        stage('Run Tests') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''
                        npm cache clean --force
                        npm cache verify
                        npx cypress run --browser=electron --reporter mocha-allure-reporter
                    '''
                }
            }
        }
        stage('Generate Report') {
            steps {
                script {
                    sh '''
                        allure generate allure-results --clean -o allure-report
                    '''
                }
            }
        }
    }
}
