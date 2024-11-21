// app/api/products/route.js
import { NextResponse } from 'next/server';
import db from '../../lib/db';  // Verifique o caminho correto


export async function GET(req) {
  try {
    // Consulta a tablea products no banco de dados "marcondes"
    const [products] = await db.query('SELECT * FROM products');
    //Retorna o conteúdo da tabela como resposta
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // Se ocorrrer um erro na consulta ou na conexao
    return NextResponse.json(
      { message: 'Erro ao buscar produtos', error: error.message },
      { status: 500 }
    );
  }
}




/*                                          CODIGO COMENTADO
// Importa a conexão com o banco de dados, que foi definida em outro arquivo (geralmente em lib/db.js)
import db from '../../lib/db';  // Certifique-se de que o caminho está correto de acordo com a estrutura do seu projeto

// Definição de uma função exportada chamada GET. Ela será acionada quando uma requisição GET for feita a essa rota.
// No Next.js 13+ (com o App Directory), você define explicitamente funções para cada tipo de método HTTP (como GET, POST, etc.).
export async function GET(req) {
  try {
    // Tenta estabelecer uma conexão com o banco de dados.
    // Aqui estamos usando o método getConnection() do banco de dados (presumivelmente configurado no db.js) para verificar a conexão.
    await db.getConnection();
    
    // Caso a conexão seja bem-sucedida, retorna uma resposta 200 (OK) com uma mensagem JSON indicando que a conexão foi bem-sucedida.
    return new Response(
      JSON.stringify({ message: 'Conexão com o banco de dados bem-sucedida!' }),  // Corpo da resposta, convertido para JSON.
      { status: 200 }  // Define o status HTTP como 200 (OK), indicando que a requisição foi bem-sucedida.
    );
  } catch (error) {
    // Se houver um erro ao tentar se conectar ao banco de dados, esse bloco de código é executado.
    // A variável 'error' contém o erro que ocorreu durante a tentativa de conexão (provavelmente um erro de configuração do banco de dados).
    return new Response(
      JSON.stringify({ message: 'Erro ao conectar ao banco de dados', error: error.message }),  // Retorna uma mensagem de erro em formato JSON.
      { status: 500 }  // Define o status HTTP como 500 (Erro Interno do Servidor), indicando que ocorreu um erro no servidor.
    );
  }
}

*/