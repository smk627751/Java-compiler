package com.smk627751.api;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.smk627751.compiler.CodeCompiler;

@WebServlet("/Java")
public class JavaCompiler extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		setCorsHeaders(response);
		StringBuilder requestBody = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        reader.close();
        String requestBodyString = requestBody.toString().replace("&gt;", ">").replace("&lt;", "<");
        JSONParser obj = new JSONParser();
        JSONObject json = null;
        try {
        	json = (JSONObject) obj.parse(requestBodyString);
        	CodeCompiler code = new CodeCompiler();
            String filePath = getServletContext().getRealPath("/WEB-INF");
            JSONObject output = code.run(filePath,json);
            response.getWriter().write(output.toJSONString());
        }
        catch(Exception e)
        {
        	
        }
	}
	
	private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers",
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        response.setHeader("Access-Control-Allow-Credentials", "true");
	}
	protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
