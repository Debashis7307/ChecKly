import apiConfig from '../components/api.json';

class WebsiteAnalysisService {
  constructor() {
    this.config = apiConfig;
  }

  async analyzeWebsite(url) {
    const results = {
      url,
      timestamp: new Date().toISOString(),
      categories: {},
      overallScore: 0,
      totalChecks: 0,
      passedChecks: 0
    };

    // Normalize URL
    const normalizedUrl = this.normalizeUrl(url);
    
    try {
      // Perform checks for each category
      for (const [categoryName, category] of Object.entries(this.config.categories)) {
        results.categories[categoryName] = {
          checks: [],
          score: 0,
          totalWeight: 0
        };

        for (const check of category.checks) {
          const checkResult = await this.performCheck(normalizedUrl, check);
          results.categories[categoryName].checks.push(checkResult);
          
          if (checkResult.status === 'pass') {
            results.categories[categoryName].score += check.weight;
            results.passedChecks++;
          }
          results.categories[categoryName].totalWeight += check.weight;
          results.totalChecks++;
        }

        // Calculate category score percentage
        if (results.categories[categoryName].totalWeight > 0) {
          results.categories[categoryName].score = Math.round(
            (results.categories[categoryName].score / results.categories[categoryName].totalWeight) * 100
          );
        }
      }

      // Calculate overall score
      const totalWeight = Object.values(results.categories).reduce(
        (sum, category) => sum + category.totalWeight, 0
      );
      const totalScore = Object.values(results.categories).reduce(
        (sum, category) => sum + (category.score * category.totalWeight / 100), 0
      );
      
      results.overallScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;

      return results;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw new Error('Website analysis failed. Please try again.');
    }
  }

  normalizeUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return url;
  }

  async performCheck(url, check) {
    const result = {
      name: check.name,
      description: check.description,
      status: 'fail',
      message: '',
      details: '',
      timestamp: new Date().toISOString()
    };

    try {
      switch (check.name) {
        case 'Sitemap.xml':
          result.status = await this.checkSitemap(url);
          result.message = result.status === 'pass' ? 'Sitemap found and accessible' : 'No accessible sitemap found';
          result.details = result.status === 'pass' ? 'Sitemap.xml is properly configured' : 'Create a sitemap.xml file and reference it in robots.txt';
          break;

        case 'Favicon':
          result.status = await this.checkFavicon(url);
          result.message = result.status === 'pass' ? 'Favicon found and loads successfully' : 'Favicon missing or not accessible';
          result.details = result.status === 'pass' ? 'Favicon is properly configured' : 'Add a favicon.ico file to your root directory';
          break;

        case 'H1 Structure':
          result.status = await this.checkH1Structure(url);
          result.message = result.status === 'pass' ? 'H1 structure is properly configured' : 'H1 structure issues found';
          result.details = result.status === 'pass' ? 'Heading tags follow logical order' : 'Ensure you have exactly one H1 tag and proper heading hierarchy';
          break;

        case 'LLMs.txt':
          result.status = await this.checkLLMsTxt(url);
          result.message = result.status === 'pass' ? 'LLMs.txt found' : 'LLMs.txt not found';
          result.details = result.status === 'pass' ? 'AI training control file is present' : 'Consider adding llms.txt to control AI training on your content';
          break;

        case 'Open Graph Tags':
          result.status = await this.checkOpenGraphTags(url);
          result.message = result.status === 'pass' ? 'Open Graph tags properly configured' : 'Open Graph tags missing or incomplete';
          result.details = result.status === 'pass' ? 'All essential OG tags present' : 'Add og:title, og:description, og:image, and og:url tags';
          break;

        case 'Robots.txt':
          result.status = await this.checkRobotsTxt(url);
          result.message = result.status === 'pass' ? 'Robots.txt found and accessible' : 'Robots.txt missing or not accessible';
          result.details = result.status === 'pass' ? 'Robots.txt is properly configured' : 'Create a robots.txt file in your root directory';
          break;

        case 'SEO Metadata':
          result.status = await this.checkSEOMetadata(url);
          result.message = result.status === 'pass' ? 'SEO metadata properly configured' : 'SEO metadata issues found';
          result.details = result.status === 'pass' ? 'Essential meta tags present' : 'Add title, description, and other important meta tags';
          break;

        case 'Image Optimization':
          result.status = await this.checkImageOptimization(url);
          result.message = result.status === 'pass' ? 'Images are optimized' : 'Image optimization issues found';
          result.details = result.status === 'pass' ? 'Images have proper formats and alt text' : 'Optimize image sizes, add alt text, and use lazy loading';
          break;

        case 'WWW Redirect':
          result.status = await this.checkWWWRedirect(url);
          result.message = result.status === 'pass' ? 'WWW redirect properly configured' : 'WWW redirect issues found';
          result.details = result.status === 'pass' ? 'Canonical URL redirects working' : 'Ensure www and non-www versions redirect to canonical URL';
          break;

        case 'HTTPS Redirect':
          result.status = await this.checkHTTPSRedirect(url);
          result.message = result.status === 'pass' ? 'HTTPS redirect properly configured' : 'HTTPS redirect not configured';
          result.details = result.status === 'pass' ? 'HTTP traffic redirects to HTTPS' : 'Configure your server to redirect HTTP to HTTPS';
          break;

        case 'SSL Certificate':
          result.status = await this.checkSSLCertificate(url);
          result.message = result.status === 'pass' ? 'SSL certificate is valid' : 'SSL certificate issues found';
          result.details = result.status === 'pass' ? 'HTTPS connection is secure' : 'Check your SSL certificate configuration';
          break;

        default:
          result.status = 'fail';
          result.message = 'Check not implemented';
          result.details = 'This check is not yet implemented';
      }
    } catch (error) {
      result.status = 'error';
      result.message = 'Check failed';
      result.details = error.message;
    }

    return result;
  }

  async checkSitemap(url) {
    try {
      const sitemapUrl = new URL('/sitemap.xml', url).href;
      const response = await fetch(sitemapUrl, { method: 'HEAD' });
      return response.ok ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkFavicon(url) {
    try {
      const faviconUrl = new URL('/favicon.ico', url).href;
      const response = await fetch(faviconUrl, { method: 'HEAD' });
      return response.ok ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkH1Structure(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const h1Tags = doc.querySelectorAll('h1');
      const h2Tags = doc.querySelectorAll('h2');
      const h3Tags = doc.querySelectorAll('h3');
      
      // Check if there's exactly one H1 tag
      if (h1Tags.length === 1) {
        return 'pass';
      }
      return 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkLLMsTxt(url) {
    try {
      const llmsUrl = new URL('/llms.txt', url).href;
      const response = await fetch(llmsUrl, { method: 'HEAD' });
      return response.ok ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkOpenGraphTags(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const ogTitle = html.includes('property="og:title"') || html.includes('property=\'og:title\'');
      const ogDescription = html.includes('property="og:description"') || html.includes('property=\'og:description\'');
      const ogImage = html.includes('property="og:image"') || html.includes('property=\'og:image\'');
      const ogUrl = html.includes('property="og:url"') || html.includes('property=\'og:url\'');
      
      return (ogTitle && ogDescription && ogImage && ogUrl) ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkRobotsTxt(url) {
    try {
      const robotsUrl = new URL('/robots.txt', url).href;
      const response = await fetch(robotsUrl, { method: 'HEAD' });
      return response.ok ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkSEOMetadata(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      const hasTitle = html.includes('<title>') && html.includes('</title>');
      const hasDescription = html.includes('name="description"') || html.includes('name=\'description\'');
      const hasViewport = html.includes('name="viewport"') || html.includes('name=\'viewport\'');
      
      return (hasTitle && hasDescription && hasViewport) ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkImageOptimization(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      
      // Simple check for img tags with alt attributes
      const imgTags = html.match(/<img[^>]*>/g) || [];
      const imgTagsWithAlt = imgTags.filter(img => img.includes('alt='));
      
      return imgTags.length === 0 || imgTagsWithAlt.length === imgTags.length ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkWWWRedirect(url) {
    try {
      const urlObj = new URL(url);
      const wwwUrl = urlObj.hostname.startsWith('www.') ? url : `https://www.${urlObj.hostname}`;
      const nonWwwUrl = urlObj.hostname.startsWith('www.') ? `https://${urlObj.hostname.replace('www.', '')}` : url;
      
      // Check if both versions exist or redirect properly
      const wwwResponse = await fetch(wwwUrl, { method: 'HEAD', redirect: 'follow' });
      const nonWwwResponse = await fetch(nonWwwUrl, { method: 'HEAD', redirect: 'follow' });
      
      return (wwwResponse.ok || nonWwwResponse.ok) ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkHTTPSRedirect(url) {
    try {
      const httpUrl = url.replace('https://', 'http://');
      const response = await fetch(httpUrl, { method: 'HEAD', redirect: 'follow' });
      
      // Check if HTTP redirects to HTTPS
      return response.url.startsWith('https://') ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }

  async checkSSLCertificate(url) {
    try {
      const response = await fetch(url);
      return response.ok ? 'pass' : 'fail';
    } catch {
      return 'fail';
    }
  }
}

export default new WebsiteAnalysisService(); 