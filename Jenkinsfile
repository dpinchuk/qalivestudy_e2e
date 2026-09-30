pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '10'))
    disableConcurrentBuilds()
    timeout(time: 35, unit: 'MINUTES')
    timestamps()
  }
  triggers { cron('TZ=Europe/Kyiv\nH 2 * * *') }
  parameters {
    booleanParam(name: 'RUN_STAGING_LIFECYCLE', defaultValue: false, description: 'Run register/login/delete cycles against an isolated non-production target.')
    string(name: 'STAGING_BASE_URL', defaultValue: '', description: 'Required non-production URL for lifecycle testing.')
    string(name: 'LIFECYCLE_ITERATIONS', defaultValue: '100', description: '1–5000 staging-only account lifecycles.')
  }
  environment {
    CI = 'true'
    E2E_BASE_URL = 'https://qalivestudy.com'
    PATH = '/opt/qa-live-study-node-v24.19.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    PLAYWRIGHT_BROWSERS_PATH = '/var/lib/jenkins/.cache/ms-playwright'
  }
  stages {
    stage('Install') {
      steps {
        sh 'node --version'
        sh 'npm ci --no-audit --no-fund'
        sh 'npx playwright install chromium'
      }
    }
    stage('Public production smoke') { steps { sh 'npm run test:public' } }
    stage('Authenticated smoke') {
      when { expression { return env.E2E_USER_EMAIL?.trim() && env.E2E_USER_PASSWORD?.trim() } }
      steps { sh 'npm run test:auth' }
    }
    stage('Staging account lifecycle') {
      when { expression { return params.RUN_STAGING_LIFECYCLE } }
      steps {
        sh '''
          test -n "$STAGING_BASE_URL"
          E2E_BASE_URL="$STAGING_BASE_URL" E2E_ALLOW_ACCOUNT_LIFECYCLE=true E2E_LIFECYCLE_ITERATIONS="$LIFECYCLE_ITERATIONS" npm run test:lifecycle
        '''
      }
    }
  }
  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-report/**,test-results/**', fingerprint: true
    }
  }
}
