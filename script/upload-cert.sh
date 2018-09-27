#!/bin/sh
certbot --agree-tos -a certbot-s3front:auth \
--certbot-s3front:auth-s3-bucket www.clojure-toolbox.com \
--certbot-s3front:auth-s3-region us-east-1 \
-i certbot-s3front:installer \
--certbot-s3front:installer-cf-distribution-id E3U0YV0QLJTML9 \
-d www.clojure-toolbox.com
