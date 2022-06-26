using NUnit.Framework;
using PactNet;
using System;


namespace PactTests.Tests
{
    [TestFixture]
    public class WebAppTests
    {
        string serviceUri;
        string pactDirectory;
        PactVerifier pactVerifier;

        public WebAppTests()
        {

            serviceUri = "http://echo.jsontest.com";
            pactDirectory = "http://localhost:9292/pacts/provider/LocalTokenAPI/consumer/WebApp/latest";
            var pactVerifierConfig = new PactVerifierConfig
            {
                PublishVerificationResults = true, //this should be an environment variable. Overriden during CI to true
                ProviderVersion = $"1.0.0 {ThisAssembly.Git.Commit}", //This should be the version of your API, synced with change set,
                Verbose=true

            };
            pactVerifier = new PactVerifier(pactVerifierConfig);

        }


        [Test]
        public void EnsureConsumerWebAppHonoursLocalTokenAPIContract()
        {
            pactVerifier.ServiceProvider("LocalTokenAPI", serviceUri)
                .HonoursPactWith("WebApp")
                .PactUri(pactDirectory)
                .Verify();
        }
    }
}
