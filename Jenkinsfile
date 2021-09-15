pipeline {
    agent any
    environment{
        /* All Variable */

        IMAGE_NAME = 'k8s/front/purevoyance_frontend_v2'
        GITHUB_PROJECT_NAME = 'purevoyance-frontend-v2'
        PROJECT_NAME_PREPROD = 'purevoyance-frontend-v2-staging'
        PROJECT_NAME_PROD = 'purevoyance-frontend-v2-prod'
        TEAM = 'front'
        
        ARGOCD_SERVER = 'argocd.front.preprod.k8s.tlmq.fr'
        HOSTNAME = 'eu.gcr.io'      
        PROJECT_ID = 'infrastructure-176114'
        METADATA_APP = "${env.GITHUB_PROJECT_NAME}-staging"

    }
    
    
    stages{
        stage('Build and Push Docker Image'){
             when { branch 'master' }
             steps {
                 script {

                    docker.withRegistry('https://eu.gcr.io','gcr:infrastructure-176114') {
                        
                        def containerResistry = docker.build("${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"," -f Dockerfile .")
                        
                        sh "docker push ${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"
                        
                        BRANCH_PATCH = sh (script:"git log -n 1 | grep devops | cut -d ':' -f2", returnStdout: true).trim()
                        TEST_DEVOPS = sh (script:"git log -n 1 | grep devops | cut -d ':' -f1", returnStdout: true).trim()
        
                    }
                 }
             }
        }

        stage('Deploy in Staging') {
             when { branch 'master' }
             steps {
                 /* pull the repository in Github using SSH, [github-key: Private key creact to Jenkins credential] */
                 git credentialsId: 'github-key', url: 'git@github.com:telemaqueHQ/DevOps.git'

                 dir("gitOps"){
                     sh "cd ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/staging/environnement && kustomize edit set image ${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"
                     
                     /*Use the sshagent to push the manifest in Github*/
                     sshagent(['github-key']){
                       sh "git add ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/staging/environnement/kustomization.yaml"
                         
                       sh 'git config --global user.email "jenkins-k8s@telemaque.fr"'
                       sh 'git config --global user.name "jenkins-ci-k8s"'
                         
                       sh "git commit -m 'Publish new version'"
                       sh 'git push --set-upstream origin master'
                       
                       script {
                           OBJECT_NAME = "${env.GITHUB_PROJECT_NAME}-${BRANCH_PATCH}"
                           ARGO_NAME_APP = "${BRANCH_PATCH}.yaml"
                         
                           if ("${TEST_DEVOPS}" == "devops") {

                               withCredentials([string(credentialsId: 'deploy-role', variable: 'ARGOCD_AUTH_TOKEN')]) {

                                   sh "argocd --grpc-web app delete ${OBJECT_NAME} --server argocd.front.preprod.k8s.tlmq.fr"

                                   sh "git rm ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"
                                   sh "git rm -r ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${BRANCH_PATCH}"

                                   sh "git status"
                                   sh "git add ${env.TEAM}/${env.GITHUB_PROJECT_NAME} ."
                                   sh "git commit -m 'delete file in folder: ${BRANCH_PATCH}'"
                                   sh 'git push --set-upstream origin master'
                               }
                           } else {
                               withCredentials([string(credentialsId: 'deploy-role', variable: 'ARGOCD_AUTH_TOKEN')]) {
                                   sh "argocd --grpc-web app sync ${env.PROJECT_NAME_PREPROD} --server ${env.ARGOCD_SERVER} --force"
                                   sh "argocd --grpc-web app wait ${env.PROJECT_NAME_PREPROD} --server ${env.ARGOCD_SERVER} --timeout 600"
                               } 

                           }
                       }
                       
                     }
                 }
             }
        }
        
        stage('Deploy in Prod') {
                 when {
                   expression {
                       env.TAG_NAME != null
                   }
                 }
             steps {
                 /* pull the repository in Github using SSH, [github-key: Private key creact to Jenkins credential] */
                 git credentialsId: 'github-key', url: 'git@github.com:telemaqueHQ/DevOps.git'

                 dir("gitOps"){
                     sh "cd ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/prod/environnement && kustomize edit set image ${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"
                     
                     /*Use the sshagent to push the manifest in Github*/
                     sshagent(['github-key']){
                       sh "git add ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/prod/environnement/kustomization.yaml"
                         
                       sh 'git config --global user.email "jenkins-k8s@telemaque.fr"'
                       sh 'git config --global user.name "jenkins-ci-k8s"'
                         
                       sh "git commit -m 'Publish new version'"
                       sh 'git push --set-upstream origin master'
                       
                       withCredentials([string(credentialsId: 'deploy-role', variable: 'ARGOCD_AUTH_TOKEN')]) {
                           sh "argocd --grpc-web app sync ${env.PROJECT_NAME_PROD} --server ${env.ARGOCD_SERVER} --force"
                           sh "argocd --grpc-web app wait ${env.PROJECT_NAME_PROD} --server ${env.ARGOCD_SERVER} --timeout 600"
                       }
                       
                     }
                 }
             }
        }

        /* Patch branche */
        stage('Build and Push Docker Image in Patch Environnement'){
             when { branch 'feat*' }
             steps {
                 script {
                    
                    docker.withRegistry('https://eu.gcr.io','gcr:infrastructure-176114') {
                        withCredentials([string(credentialsId: 'npm-token', variable: 'NPM_TOKEN')]) {
                            def containerResistry = docker.build("${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"," -f Dockerfile --build-arg NPM_TOKEN=${env.NPM_TOKEN} .")
                        }
                        sh "docker push ${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"
                    }
                 }
             }
        }

        stage('Deploy in Patch Environnement') {
             when { branch 'feat*' }

             steps {
                 /* pull the repository in Github using SSH, [github-key: Private key creact to Jenkins credential] */
                 git credentialsId: 'github-key', url: 'git@github.com:telemaqueHQ/DevOps.git'

                 dir("gitOps"){
                     
                     script {
                         OBJECT_NAME = "${env.GITHUB_PROJECT_NAME}-${env.BRANCH_NAME}"
                         ARGO_NAME_APP = "${env.BRANCH_NAME}.yaml"

                         if (fileExists("${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}")) {
                             withCredentials([string(credentialsId: 'deploy-role', variable: 'ARGOCD_AUTH_TOKEN')]) {
                                 sh "argocd --grpc-web app sync ${OBJECT_NAME} --server ${env.ARGOCD_SERVER} --force"
                                 sh "argocd --grpc-web app wait ${OBJECT_NAME} --server ${env.ARGOCD_SERVER} --timeout 600"
                             }
                         } else {
                               sh "cp -r ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/staging ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${env.BRANCH_NAME}"
                               sh "sed -i 's/${env.GITHUB_PROJECT_NAME}/${OBJECT_NAME}/g' ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${env.BRANCH_NAME}/base/deployment.yaml"
                               sh "sed -i 's/${env.GITHUB_PROJECT_NAME}/${OBJECT_NAME}/g' ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${env.BRANCH_NAME}/environnement/*"

                               sh "cp ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/application-staging.yaml ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"
                               sh "sed -i 's/${METADATA_APP}/${OBJECT_NAME}/g' ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"
                               sh "sed -i 's/staging/${env.BRANCH_NAME}/g' ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"

                               sh "cd ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${env.BRANCH_NAME}/environnement && kustomize edit set image ${env.HOSTNAME}/${env.PROJECT_ID}/${env.IMAGE_NAME}:${env.GIT_COMMIT}"
                     
                               /*Use the sshagent to push the manifest in Github*/
                               sshagent(['github-key']){
                                   sh "git add ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/${env.BRANCH_NAME}"
                                   sh "git add ${env.TEAM}/${env.GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"
                         
                                   sh 'git config --global user.email "jenkins-k8s@telemaque.fr"'
                                   sh 'git config --global user.name "jenkins-ci-k8s"'
                         
                                   sh "git commit -m 'Publish resolution patch'"
                                   sh 'git push --set-upstream origin master'

                                   withCredentials([string(credentialsId: 'deploy-role', variable: 'ARGOCD_AUTH_TOKEN')]) {
                                       sh "chmod 744 ${TEAM}/${GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP}"
                                       sh "argocd --grpc-web app create --file ${TEAM}/${GITHUB_PROJECT_NAME}/application/${ARGO_NAME_APP} --server ${ARGOCD_SERVER}"
                                   }
                       
                               }
                           }
                     }

                    
                    
                 }
             }
        }

        
    }
}
