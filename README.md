# Keyword Finder
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/25ac0fa16b404b0ebabd32d50492def8)](https://www.codacy.com/app/Agrendalath/Keyword-Finder?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Agrendalath/Keyword-Finder&amp;utm_campaign=Badge_Grade)

Never again open websites just to find if there are things you desire.

## Developement configuration
### First run
You can build and run development machines using following commands:
<pre>
docker-compose build && docker-compose up
</pre>
After this, run following script in a separate terminal emulator:
<pre>
./first_run.sh
</pre>

### Next runs
If you want to run Keyword Finder again, you can just type:
<pre>
docker-compose up
</pre>


## Production configuration
### Deployment
If you want to run this server in production environment, **while running the web container**, you need to:

1. comment out line: "DEBUG = True" in file keyword_finder/keyword_finder/settings.py,

2. adjust "ALLOWED_HOSTS" in file keyword_finder/keyword_finder/settings.py,

3. change "SECRET_KEY" in file keyword_finder/keyword_finder/settings.py,

4. adjust domain in nginx.conf,

5. change line in Dockerfile from "8000:8000" to "80:80",

6. change passwords in Dockerfile and keyword_finder/keyword_finder/settings.py,

7. issue following commands:
<pre>
mv run_production.sh run_web.sh
docker exec -i -t keywordfinder_web_1 /bin/bash
pip install gunicorn
apt-get update && apt-get install -y nginx
cp nginx.conf /etc/nginx/sites-enabled/
</pre>

### Running server
Run your production server with:
<pre>docker-compose up --abort-on-container-exit --no-recreate</pre>
