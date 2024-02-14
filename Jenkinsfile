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
        stage('Run tests'){
            steps {
                bat 'npx cypress run'
            }
        }
    }
}
