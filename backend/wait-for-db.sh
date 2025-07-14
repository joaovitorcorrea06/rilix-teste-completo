#!/bin/sh
echo "⏳ Aguardando o banco estar disponível em db:5432..."

until nc -z db 5432; do
  sleep 1
done

echo "✅ Banco disponível! Iniciando servidor..."
exec "$@"
