<template>
  <div>
    <Dashboard :uppy="uppy" />
  </div>
</template>

<script>
import { defineComponent, computed, ref, onBeforeUnmount, onMounted } from 'vue';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/vue';
// import XHRUpload from '@uppy/xhr-upload';


import '@uppy/core/dist/style.css';
	import '@uppy/dashboard/dist/style.css';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'YOUR_SUPABASE_URL';
// const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
// const supabase = createClient(supabaseUrl, supabaseKey);
import { supabase } from '@/services/supabaseClient'
// import { Tus } from 'https://releases.transloadit.com/uppy/v3.6.1/uppy.min.mjs'
import {
        // Uppy,
        // Dashboard,
        Tus,
      } from 'https://releases.transloadit.com/uppy/v3.6.1/uppy.min.mjs'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbGhjdW9sb29sdXpncGhkb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NzYzODcsImV4cCI6MjAxNTA1MjM4N30.kP112lC0VzvrwOm3WNfqho-ViQhugAQDtyDhcn4_P78'
const SUPABASE_PROJECT_ID = 'dmlhcuolooluzgphdomp'
const STORAGE_BUCKET = 'avatars'
      // const BEARER_TOKEN='replace-with-your-bearer-token'

      const folder = ''
// const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`

let token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Ijdqb0RLaUF2SzNMWVAyV2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RtbGhjdW9sb29sdXpncGhkb21wLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIyNmU3NmE3Zi1kOTcwLTRlMWMtYTg4Ni04NmYwNWU3NTZiMGYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwNjgwNjQ0LCJpYXQiOjE3MzA2NzcwNDQsImVtYWlsIjoibWFrY21ha2MzMjFAbWFpbC5ydSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzMwNjcyNTYwfV0sInNlc3Npb25faWQiOiIwZjcxZjcyMy1iMDlkLTRjYTMtOWVkZC02NzgzNDE2NmYwYmIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.DC1BxQ9o6yPPV8SYSNy0joUoj7qW-vvmL5Iok4dK-M8'
export default defineComponent({
  name: 'upload-button',
  components: {
    Dashboard,
  },
  setup() {
    const uppy = ref(null);
    // const token = ref(null)

    async function init() {

      // const token = async () => {
      const { data: { session } } = await supabase.auth.getSession()
        // return session?.access_token
      // }
      // token.value = session?.access_token
      console.log(session?.access_token, ' token.value')

    }
    // onMounted(async () => {
    //   const { data: { session } } = await supabase.auth.getSession()
    //   // console.log('Bearer Token:', session);
    //   token.value = session?.access_token
    //   // console.log(token.value, ' token.value')

    // })

    init()


    const initializeUppy = computed(() => {
        return () => {
          const uppyInstance = new Uppy({
            debug: true,
            autoProceed: true,
          });

          console.log(token, '  - token.value')
          uppyInstance.use(Tus, {
            endpoint: `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`, // Замените на ваш Tus endpoint
            // resume: true,
            headers: {
              authorization: `Bearer ${token}`, // Используйте токен для авторизации
              apikey: SUPABASE_ANON_KEY,
            },
            uploadDataDuringCreation: true,
            chunkSize: 6 * 1024 * 1024,
            allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
            onError: function (error) {
              console.log('Failed because: ' + error)
            },            
          });

          uppyInstance.on('file-added', (file) => {
            const supabaseMetadata = {
              bucketName: STORAGE_BUCKET,
              objectName: folder ? `${folder}/${file.name}` : file.name,
              contentType: file.type,
            }

            file.meta = {
              ...file.meta,
              ...supabaseMetadata,
            }

            console.log('file added', file)
          })          

          uppyInstance.on('complete', async (result) => {
            console.log('Загрузка завершена!', result);
            // for (const file of result.successful) {
            //   // Загружаем файл в Supabase Storage
            //   const { data, error } = await supabase.storage
            //     .from('avatars') // Замените на имя вашего бакета
            //     .upload(file.name, file.data);

            //   if (error) {
            //     console.error('Ошибка загрузки в Supabase:', error);
            //   } else {
            //     console.log('Файл загружен в Supabase:', data);
            //   }
            // }
          });

          return uppyInstance;
        };
      });


      uppy.value = initializeUppy.value();

    onBeforeUnmount(() => {
      if (uppy.value) {
        uppy.value.close();
      }
    });

    return { uppy };
  },
  // setup() {
  //   // const { data: { session } } =  supabase.auth.getSession()


  //   // const session = async () => {
  //   //   const { data: { session } } =  await supabase.auth.getSession()
  //   //   return session
  //   // }

  //   //     console.log(session, ' sessiong')

  //   const uppy = computed(() => {
  //     const uppyInstance = new Uppy({
  //       restrictions: {
  //         maxNumberOfFiles: 5,
  //         // allowedFileTypes: ['image/*', 'video/*'],
  //       },
  //       autoProceed: true,
  //     });

  //     uppyInstance.use(Tus, {
  //       endpoint: `https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/upload/resumable`, // Укажите ваш bucket
  //       formData: true,
  //       fieldName: 'file',
  //       headers: {
  //         authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  //         'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
  //       },
  //       resume: true,

  //     });

  //     // uppyInstance.use(Tus, {
  //     //   endpoint: `https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/upload/resumable`,
  //     //   headers: {
  //     //     authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  //     //   },
  //     //   formData: true,
  //     //   fieldName: 'file',
  //     //   allowedMetaFields: ['name', 'artist', 'cover'], // Добавление метаданных
  //     //   restrictions: { maxNumberOfFiles: 1 },        
  //     //   // chunkSize: 6 * 1024 * 1024,
  //     //   // allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
  //     // })

  //     // uppyInstance.on('file-added', (file) => {
  //     //   file.meta = {
  //     //     name: file.name,
  //     //     artist: 'Artist Name',
  //     //     cover: 'URL_TO_COVER_IMAGE',
  //     //   };
  //     // });

  //     uppyInstance.on('upload-success', (file, response) => {
  //       console.log('File uploaded successfully:', file);
  //     });

  //     uppyInstance.on('upload-error', (file, error) => {
  //       console.error('Upload error:', error);
  //     });

  //     return uppyInstance;
  //   });

  //   onUnmounted(() => {
  //     uppy.value.close(); // Закрываем Uppy при размонтировании компонента
  //   });

  //   onMounted(async () => {
  //     const { data: { session } } =  await supabase.auth.getSession()
  //     console.log(session, 'seesiong')
  //   })

  //   return {
  //     uppy,
  //   };
  // },
});
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>



// async function signIn(email, password) {
  //   const { data, error } =  await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     console.error('Ошибка при входе:', error);
  //     return;
  //   }

  //   const { user, session } = data

  //   console.log('Пользователь:', user);
  //   console.log('Сессия:', session);

  //   // Bearer token доступен в session.access_token
  //   const bearerToken = session?.access_token;
  //   console.log('Bearer Token:', bearerToken);
  // }

  // signIn('makcmakc321@mail.ru', 'makcmakc12345')