import { HttpRequest, HttpInterceptor, HttpHandler  } from "@angular/common/http";
import { Injectable } from "@angular/core"; 

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler) {
    
        let language = localStorage.getItem('language') as string;



    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // '98aa390a62msh3af6cc595ae2121p189d3fjsnc19aaeea9cb6' maria
    //'867b235d0dmsh8f5fbaa45a9b047p1ad368jsne325fb7d8d75' tia dalma
    
    const authReq = req.clone({
        headers: req.headers
        .append ( 'X-RapidAPI-Key','98aa390a62msh3af6cc595ae2121p189d3fjsnc19aaeea9cb6'  )
        .append ( 'X-RapidAPI-Host', 'one-piece-episodes.p.rapidapi.com' ),
        params: req.params.append('language', language)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
    } 
}