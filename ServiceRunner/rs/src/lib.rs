
#[macro_use]
extern crate jsonrpc_client_core;
use serde::{Serialize, Deserialize};

#[cfg(test)]
use autorand::Random;

#[cfg(test)]
mod test_harness;

pub type ServiceName = String;
pub type Version = String;
pub type InstallSuccess = bool;
pub type InstalledServices = Vec<String>;
pub type RunningServices = Vec<RunningService>;
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[cfg_attr(test, derive(Random))]
pub struct RunningService {
    #[serde(rename = "type")]
    running_service_type: Option<Vec<String>>,
}
#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[cfg_attr(test, derive(Random))]
pub struct ServiceConfig {
    #[serde(rename = "environment")]
    environment: Option<String>,

    #[serde(rename = "host")]
    host: Option<String>,

    #[serde(rename = "name")]
    name: Option<String>,

    #[serde(rename = "port")]
    port: Option<i64>,

    #[serde(rename = "type")]
    service_config_type: Option<Vec<String>>,
}

jsonrpc_client!(pub struct ServiceRunner {

pub fn installService(&mut self, serviceName: ServiceName, version: Version) -> RpcRequest<InstallSuccess>;

pub fn listInstalledServices(&mut self) -> RpcRequest<InstalledServices>;

pub fn listRunningServices(&mut self) -> RpcRequest<RunningServices>;

pub fn startService(&mut self) -> RpcRequest<ServiceConfig>;

});

#[cfg(test)]
mod tests {
    use super::*;
    use test_harness::*;
    use autorand::Random;
    use futures::Future;


    #[test]
    #[allow(non_snake_case)]
    fn installService_test () {
        //- method quety template start
        let method = "installService".into();
        //- method query template end

        //- params query template start
        let mut params = Vec::new();
        //-- loop over params start
    
    
        
        let ServiceName_value = ServiceName::random();
        let serialized = serde_json::to_value(&ServiceName_value).unwrap();
        params.push(serialized);
    
        
        let Version_value = Version::random();
        let serialized = serde_json::to_value(&Version_value).unwrap();
        params.push(serialized);
    
        //-- loop over params end
        //- params query template end

        //- result query template start
        let result = InstallSuccess::random();
        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_serialized = serde_json::to_vec(&result).unwrap();
        let result: InstallSuccess = serde_json::from_slice(&result_serialized).unwrap();
        //- result query template end

        let transport = MockTransport {
            method,
            params,
            result: serde_json::to_value(&result).unwrap(),
        };

        let mut client = ServiceRunner::new(transport);
        let received_result = client.installService(
            //- loop over params start
        
            ServiceName_value,
        
            Version_value,
        
            //- loop over params end
        ).wait().unwrap();

        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_s =
        assert_eq!(result, received_result);
    }

    #[test]
    #[allow(non_snake_case)]
    fn listInstalledServices_test () {
        //- method quety template start
        let method = "listInstalledServices".into();
        //- method query template end

        //- params query template start
        let mut params = Vec::new();
        //-- loop over params start
    
    
        //-- loop over params end
        //- params query template end

        //- result query template start
        let result = InstalledServices::random();
        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_serialized = serde_json::to_vec(&result).unwrap();
        let result: InstalledServices = serde_json::from_slice(&result_serialized).unwrap();
        //- result query template end

        let transport = MockTransport {
            method,
            params,
            result: serde_json::to_value(&result).unwrap(),
        };

        let mut client = ServiceRunner::new(transport);
        let received_result = client.listInstalledServices(
            //- loop over params start
        
            //- loop over params end
        ).wait().unwrap();

        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_s =
        assert_eq!(result, received_result);
    }

    #[test]
    #[allow(non_snake_case)]
    fn listRunningServices_test () {
        //- method quety template start
        let method = "listRunningServices".into();
        //- method query template end

        //- params query template start
        let mut params = Vec::new();
        //-- loop over params start
    
    
        //-- loop over params end
        //- params query template end

        //- result query template start
        let result = RunningServices::random();
        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_serialized = serde_json::to_vec(&result).unwrap();
        let result: RunningServices = serde_json::from_slice(&result_serialized).unwrap();
        //- result query template end

        let transport = MockTransport {
            method,
            params,
            result: serde_json::to_value(&result).unwrap(),
        };

        let mut client = ServiceRunner::new(transport);
        let received_result = client.listRunningServices(
            //- loop over params start
        
            //- loop over params end
        ).wait().unwrap();

        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_s =
        assert_eq!(result, received_result);
    }

    #[test]
    #[allow(non_snake_case)]
    fn startService_test () {
        //- method quety template start
        let method = "startService".into();
        //- method query template end

        //- params query template start
        let mut params = Vec::new();
        //-- loop over params start
    
    
        //-- loop over params end
        //- params query template end

        //- result query template start
        let result = ServiceConfig::random();
        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_serialized = serde_json::to_vec(&result).unwrap();
        let result: ServiceConfig = serde_json::from_slice(&result_serialized).unwrap();
        //- result query template end

        let transport = MockTransport {
            method,
            params,
            result: serde_json::to_value(&result).unwrap(),
        };

        let mut client = ServiceRunner::new(transport);
        let received_result = client.startService(
            //- loop over params start
        
            //- loop over params end
        ).wait().unwrap();

        // transcode result to workaround Some(Null) -> Null serialization detail loss
        let result_s =
        assert_eq!(result, received_result);
    }

}
